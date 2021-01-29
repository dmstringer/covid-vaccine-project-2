const { Guarantee, Location, Slot, Waitlist } = require("../../db/models");
const uuidv4 = require("uuid").v4;

module.exports = {
  Mutation: {
    createLocation: (_, { model }) =>
      Location.create({ ...model, id: uuidv4() }),

    updateLocation: async (_, { model }) => {
      const LocationToUpdate = await Location.findByPk(model.id);
      return LocationToUpdate.update(model);
    },
  },
  Query: {
    SlotsForLocation: async (_, { id }) => {
      const theLocation = await Location.findByPk(id);
      const theSlots = await Slot.findAll({
        where: { locationId: id, isReserved: false },
      });
      const numGuarantees = (
        await Guarantee.findAll({ where: { locationId: id } })
      ).length;
      const numWaitlists = (
        await Waitlist.findAll({ where: { locationId: id } })
      ).length;

      return {
        location: theLocation,
        numAvailableSlots: theSlots.length,
        numGuarantees: numGuarantees,
        numWaitlists: numWaitlists,
        availableSlots: theSlots,
      };
    },
  },
};
