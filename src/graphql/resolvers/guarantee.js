const { Guarantee } = require("../../db/models");
const uuidv4 = require("uuid").v4;

module.exports = {
  Mutation: {
    createGuarantee: (_, { model }) =>
      Guarantee.create({ ...model, id: uuidv4() }),

    updateGuarantee: async (_, { model }) => {
      const GuaranteeToUpdate = await Guarantee.findByPk(model.id);
      return GuaranteeToUpdate.update(model);
    },

    upsertGuarantee: async (_, { model }) => {
      if (!model.id) {
        model.id = uuidv4();
      }
      await Guarantee.upsert({ ...model });
      return Guarantee.findByPk(model.id);
    },
  },

  Query: {
    getGuarantees: () => Guarantee.findAll(),

    getGuaranteeByPk: (_, { id }) => Guarantee.findByPk(id),
  },
};
