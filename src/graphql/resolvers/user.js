const { User } = require("../../db/models");
const uuidv4 = require("uuid").v4;

module.exports = {
  Mutation: {
    createAccount: (_, { model }) => {
      return User.create({ ...model, id: uuidv4() });
    },

    updateUser: async (_, { model }) => {
      const UserToUpdate = await User.findByPk(model.id);
      return UserToUpdate.update(model);
    },

    upsertUser: async (_, { model }) => {
      if (!model.id) {
        model.id = uuidv4();
      }
      await User.upsert({ ...model });
      return User.findByPk(model.id);
    },
  },
  Query: {
    getUsers: () => User.findAll(),

    getUser: (_, { id }) => User.findByPk(id),
  },
};
