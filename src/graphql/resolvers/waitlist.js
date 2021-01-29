const { Waitlist } = require("../../db/models/waitlist");

module.exports = {
  createWaitlist: (_, { model }) => Waitlist.create({ ...model, id: v4() }),

  getWaitlists: () => Waitlist.findAll(),

  deleteWaitlist: async (_, { id }) => {
    const deletedWaitlist = await Waitlist.destroy({ where: { id } });
    return deletedWaitlist ? true : false;
  },
};
