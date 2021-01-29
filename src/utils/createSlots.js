const { Slot } = require("../db/models");
const { Location } = require("../db/models");
const moment = require("moment");
const uuidv4 = require("uuid").v4;

const createSlots = async (amount, startDate, runDays) => {
  Slot.destroy({ truncate: true });
  const locations = await Location.findAll();

  locations.forEach((location) => {
    const newSlots = [];
    console.log(location.id);

    for (let i = 0; i < runDays; i++) {
      for (let j = 0; j < amount; j++) {
        const currentHour = moment(startDate).add(i, "days").add(j, "hours");
        console.log();
        newSlots.push({
          id: uuidv4(),
          day: currentHour,
          locationId: location.id,
          isReserved: false,
        });
      }
    }
    Slot.bulkCreate(newSlots);
  });
};

module.exports.createSlots = createSlots;
