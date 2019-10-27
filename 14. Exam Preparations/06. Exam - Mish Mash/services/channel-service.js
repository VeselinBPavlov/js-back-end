const Channel = require('mongoose').model('Channel');
const User = require('mongoose').model('User');

module.exports = {
    create: (body)  => {
        let { name, description, tags, type } = body;
        return new Promise((resolve, reject) => {
            Channel
                .create({
                    name,
                    description,
                    type,
                    tags: tags.split(", "),
                    followers: []
                })
                .then(channel => resolve(channel))
                .catch(err => reject(err));
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            Channel
            .findById(id)
            .then(channel => resolve(channel))
            .catch(err => reject(err));
        });
    },

    getChannels: (user, tags) => {
        return Promise.all([           
            Channel.find({ followers: { $in: [user._id] }}),
            Channel.find({ followers: { $nin: [user._id] }, tags: { $in: tags }}),
            Channel.find({ followers: { $nin: [user._id] }, tags: { $nin: tags }})
        ]);
    },

    getAllTags: (id) => {
        return new Promise((resolve, reject) => {
            User
            .findById(id)
            .populate('channels')
            .then(users => {
                let tags = [];
                users.channels.forEach(channel => {
                    tags = [...tags, ...channel.tags]
                });
                resolve(tags);
            })
            .catch(err => reject(err));
        });
    }
}