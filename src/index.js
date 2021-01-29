require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers/index");
const sequelize = require("./db/sequelize");
const cron = require("node-cron");
const { createSlots } = require("./utils/createSlots");
const { expireGuarantees } = require("./utils/expireGuarantees");

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req, res }) => ({ req, res }),
  });

  await sequelize();

  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get("/", function (req, res) {
    res.send("");
  });

  server.applyMiddleware({ app, path: "/graphql" });

  const httpServer = createServer(app);

  cron.schedule("* * * * *", expireGuarantees);
  const startDate = new Date();
  createSlots(5, startDate.setHours(8), 5);

  httpServer.listen({ port: process.env.PORT }, () =>
    console.log(`Server is running on port ${process.env.PORT}/graphql`)
  );
};

startServer().then();
