const { Guarantee } = require('../../db/models/guarantee');

module.exports = {
    createGuarantee: (_, { model }) => Guarantee.create({ ...model, id: v4() }),

    updateGuarantee: (_, { model }) => {
        const GuaranteeToUpdate = await Guarantee.findByPk(model.id);
        return GuaranteeToUpdate.update(model);
    },

    upsertGuarantee: (_, { model }) => {
        if (!model.id) {
            model.id = uuidv4();
          }
          await Guarantee.upsert({ ...model });
          return Guarantee.findByPk(model.id);
    },

    getGuarantees: () => Guarantee.findAll(),

    getGuaranteeByPk: (_, { id }) => Guarantee.findByPk(id),

};
