const { Sequelize } = require("sequelize");

module.exports = async () => {
  const sequelize = await new Sequelize(process.env.SQL_CONNECTION_URL);
};
