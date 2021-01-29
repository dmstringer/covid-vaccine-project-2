const { Location } = require('../../db/models/location');
const { Guarantee } = require('../../db/models/guarnantee');
const { Waitlist } = require('../../db/models/waitlist');
const { Slot } = require('../../db/models/slot');

module.exports = {
    createSlot: (_, { model }) => Slot.create({ ...model, id: v4() }),

    updateSlots: (_, { model }) => {
        const LocationToUpdate = await Slot.findByPk(model.id);
        return LocationToUpdate.update(model);
    },

    upsertSlots: (_, { model }) => {
        if (!model.id) {
            model.id = uuidv4();
        }
        await Slot.upsert({ ...model });
      
        return Slot.findByPk(model.id);
    },

    allSlots: () => Slot.findAll(),

    slotByPk: (_, { id }) => Slot.findByPk(id),

    unreserveSlot: async (_, { id }) => {
        const slot = await Slot.findByPk(id);
        if (slot.isReserved) {
          await slot.update({ ...slot, isReserved: false, userId: null });
          return true;
        }
        return false;
    },

    slotsToReserve: async (_, { guaranteeId }) => {
        const guarantee = await Guarantee.findByPk(guaranteeId);
        const location = await Location.findByPk(guarantee.locationId);
        const guaranteesByLocation = await GuaranteeModel.findAll({
        where: { locationId: location.id, isExpired: false },
        });
        const slots = await Slot.findAll({
        where: { isReserved: false, locationId: location.id },
        });
        const waitListsByLocation = await Waitlist.findAll({
        where: { locationId: location.id },
        });

        return {
        location: location,
        numberOfAvailableSlots: slots.length,
        numberOfPending: guaranteesByLocation.length,
        numberOfWaitlist: waitListsByLocation.length,
        availableSlots: slots,
        };
    },

    slotToReserveRequest: async (_, { userId, slotId }) => {
        const guarantee = await Guarantee.findOne({ where: { userId } });
        if (!guarantee.isExpired) {
          const reservedSlot = await Slot.findByPk(slotId);
          if (!reservedSlot.isReserved) {
            return reservedSlot.update({
              ...reservedSlot,
              isReserved: true,
              userId,
            });
          }
        }
        return false;
    },
};
