const Expence = require('mongoose').model('Expence');
const User = require('mongoose').model('User');
const userService = require('../services/user-service');

module.exports = {
    create: (merchant, total, category, description, isReport, creator)  => {
        return new Promise((resolve, reject) => {
            if (isReport === 'on') {
                isReport = true;
            } else {
                isReport = false;
            }
            
            Expence
                .create({
                    merchant,
                    total: +total,
                    category,
                    description,
                    isReport,
                    creator
                })
                .then(expence => resolve(expence))
                .catch(err => reject(err));
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            Expence
            .findById(id)
            .then(expence => resolve(expence))
            .catch(err => reject(err));
        });
    },

    delete: (userId, expenceId) => {
        return new Promise((resolve, reject) => {
            Expence
            .deleteOne({ _id: expenceId })
            .then(expence => {
                User
                    .updateOne({ _id: userId }, { $pull: { expences: expenceId } })
                    .then(user => resolve(user))                
            })
            .catch(err => reject(err));
        });
    },

    getExpencesByUser: (userId) => {
            return new Promise((resolve, reject) => {
                Expence
                .find({creator: userId})
                .then(expences => resolve(expences))
                .catch(err => reject(err));
            });
    }


}