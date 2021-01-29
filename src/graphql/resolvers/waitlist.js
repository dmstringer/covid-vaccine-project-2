const { Waitlist } = require("../../db/models");
const uuidv4 = require("uuid").v4;

module.exports = {
  Mutation: {
    createWaitlist: (_, { model }) =>
      Waitlist.create({ ...model, id: uuidv4() }),

    deleteWaitlist: async (_, { id }) => {
      const deletedWaitlist = await Waitlist.destroy({ where: { id } });
      return deletedWaitlist ? true : false;
    },
  },
  Query: {
    getWaitlists: () => Waitlist.findAll(),
  },
};
