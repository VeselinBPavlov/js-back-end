const User = require('mongoose').model('User');

module.exports = {
    create: (username, amount, hashedPass, salt)  => {
        return new Promise((resolve, reject) => {
            User
                .create({
                    username,
                    amount,
                    hashedPass,
                    salt,
                    roles: [],
                    expences: []
                })
                .then(user => resolve(user))
                .catch(err => reject(err));
        });
    },

    getByUsername: (username) => {
        return new Promise((resolve, reject) => {
            User
            .findOne({ username })
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            User
            .findById(id)
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            User
            .find()
            .then(users => resolve(users))
            .catch(err => reject(err));
        });
    },

    addExpence: (expenceId, userId) => {
        return new Promise((resolve, reject) => {
            User
            .updateOne({ _id: userId }, { $push: { expences: expenceId }})
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    },

    addAmount: (userId, amount) => {
        return new Promise((resolve, reject) => {

            User
            .updateOne({ _id: userId }, { amount })
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    },

    getUserWithExpences: (userId) => {
        return new Promise((resolve, reject) => {
            User
            .findById(userId)
            .populate('expences')
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    }


}