const UserResolver = require("./user");
const LocationResolver = require("./location");
const GuaranteeResolver = require("./guarantee");
const SlotResolver = require("./slot");
const WaitlistResolver = require("./waitlist");
const merge = require("lodash.merge");

module.exports = merge(
  UserResolver,
  LocationResolver,
  GuaranteeResolver,
  SlotResolver,
  WaitlistResolver
);
