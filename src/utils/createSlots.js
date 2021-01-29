const SlotModel = require('../db/models/slot').default;
const LocationModel = require('../db/models/location').default;
const moment = require('moment');
const v4 = require('uuid').v4;

const createSlots = async (amount, startDate, runDays) => {
  SlotModel.destroy({ truncate: true });
  const locations = await LocationModel.findAll();

  locations.forEach((location) => {
    const newSlots = [];
    console.log(location.id);

    for (let i = 0; i < runDays; i++) {
      for (let j = 0; j < amount; j++) {
        const currentHour = moment(startDate).add(i, 'days').add(j, 'hours');
        console.log();
        newSlots.push({
          id: v4(),
          day: currentHour,
          locationId: location.id,
          isReserved: false,
        });
      }
    }
    SlotModel.bulkCreate(newSlots);
  });
};

module.exports.createSlots = createSlots;
