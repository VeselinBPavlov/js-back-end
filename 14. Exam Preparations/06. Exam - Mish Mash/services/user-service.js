const User = require('mongoose').model('User');
const Channel = require('mongoose').model('Channel');

module.exports = {
    create: (username, email, hashedPass, salt)  => {
        return new Promise((resolve, reject) => {
            User
                .create({
                    username,
                    email,
                    hashedPass,
                    salt,
                    roles: [],
                    channels: []
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

    getUserWithChannels: (id) => {
        return new Promise((resolve, reject) => {
            User
            .findById(id)
            .populate('channels')
            .then(users => resolve(users))
            .catch(err => reject(err));
        });
    },

    follow: (userId, channelId) => {
        return Promise.all([
            User.updateOne({ _id: userId }, { $push: { channels: channelId } }),
            Channel.updateOne({ _id: channelId }, { $push: { followers: userId } })
        ]);
    },

    unfollow: (userId, channelId) => {
        return Promise.all([
            User.updateOne({ _id: userId }, { $pull: { channels: channelId } }),
            Channel.updateOne({ _id: channelId }, { $pull: { followers: userId } })
        ]);
    }
}