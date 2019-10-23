const User = require('mongoose').model('User');
const Team = require('mongoose').model('Team');

module.exports = {
    create: (username, firstName, lastName, imageUrl, hashedPass, salt)  => {
        return new Promise((resolve, reject) => {
            User
                .create({
                    username,
                    firstName,
                    lastName,
                    imageUrl,
                    hashedPass,
                    salt,
                    roles: []
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

    getByIdWithTeams: (id) => {
        return new Promise((resolve, reject) => {
            User
            .findById(id)
            .populate('teams')
            .then(user => resolve(user))
            .catch(err => reject(err));
        });
    },

    distributeTeam: (userId, teamId) => {
        return Promise.all([
            User.updateOne({ _id: userId }, { $push: { teams: teamId } }),
            Team.updateOne({ _id: teamId }, { $push: { members: userId } })
        ]);
    },

    leaveTeam: (userId, teamId) => {
        return Promise.all([
            User.updateOne({ _id: userId }, { $pull: { teams: teamId } }),
            Team.updateOne({ _id: teamId }, { $pull: { members: userId } })
        ]);
    }
}