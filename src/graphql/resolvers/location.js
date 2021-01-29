const { Location } = require('../../db/models/location');
const { Guarantee } = require('../../db/models/guarnantee');
const { Waitlist } = require('../../db/models/waitlist');
const { Slot } = require('../../db/models/slot');

module.exports = {
    createLocation: (_, { model }) => Location.create({ ...model, id: v4() }),

    updateLocation: (_, { model }) => {
        const LocationToUpdate = await Location.findByPk(model.id);
        return LocationToUpdate.update(model);
    },

    SlotsForLocation: async (_, { id }) => {
        const theLocation = await Location.findByPk(id);
        const theSlots = await Slot.findAll({where: { locationId: id, isReserved: false },});
        const numGuarantees = (await Guarantee.findAll({where: { locationId: id },})).length;
        const numWaitlists = (await Waitlist.findAll({ where: { locationId: id } })).length;
    
        return {
          location: theLocation,
          numAvailableSlots: theSlots.length,
          numGuarantees: numGuarantees,
          numWaitlists: numWaitlists,
          availableSlots: theSlots,
        };
    },
};
