const moment = require('moment');

const GuaranteeModel = require("../db/models/guarantee").default;
console.log(GuaranteeModel)

const expireGuarantees = async () => {
  const guarantees = await GuaranteeModel.findAll();

  const compareDate = moment();

  for (guarantee of guarantees) {
    const guaranteeDate = moment(guarantee.createdAt)

    if (compareDate.diff(guaranteeDate) > 300000) {
      await guarantee.update({...guarantee, isExpired: true})
    }
  }

};

module.exports.expireGuarantees = expireGuarantees;
