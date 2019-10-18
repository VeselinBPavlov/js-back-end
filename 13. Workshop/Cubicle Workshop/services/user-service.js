const User = require('mongoose').model('User');

module.exports = {
    create: (username, hashedPass, salt)  => {
        return new Promise((resolve, reject) => {
            User
                .create({
                    username,
                    hashedPass,
                    salt,
                    roles: []
                })
                .then(user => resolve(user))
                .catch(err => reject(err));
        });
    },

    get: (username) => {
        return new Promise((resolve, reject) => {
            User
            .findOne({ username })
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    }
}