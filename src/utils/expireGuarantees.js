const moment = require("moment");

const { Guarantee } = require("../db/models");

const expireGuarantees = async () => {
  const guarantees = await Guarantee.findAll();

  const compareDate = moment();

  for (guarantee of guarantees) {
    const guaranteeDate = moment(guarantee.createdAt);

    if (compareDate.diff(guaranteeDate) > 300000) {
      await guarantee.update({ ...guarantee, isExpired: true });
    }
  }
};

module.exports.expireGuarantees = expireGuarantees;
