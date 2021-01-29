const { User } = require('../../db/models/user');

module.exports = {
    createAccount: (_, { model }) => {
        return User.create({ ...model, id: v4() });
    },

    updateUser: (_, { model }) => {
        const UserToUpdate = await User.findByPk(model.id);
        return UserToUpdate.update(model);
    },

    upsertUser: (_, { model }) => {
        if (!model.id) {
            model.id = uuidv4();
        }
        await User.upsert({ ...model });
        return User.findByPk(model.id);
    },

    getUsers: () => User.findAll(),

    getUser: (_, { id }) => User.findByPk(id),
};
