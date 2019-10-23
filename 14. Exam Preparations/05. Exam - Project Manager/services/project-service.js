const Project = require('mongoose').model('Project');

module.exports = {
    create: (name, description)  => {
        return new Promise((resolve, reject) => {
            Project
                .create({
                    name,
                    description
                })
                .then(project => resolve(project))
                .catch(err => reject(err));
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            Project
            .find( { team: null } )
            .then(projects => resolve(projects))
            .catch(err => reject(err));
        });
    },

    getAllWithTeams: () => {
        return new Promise((resolve, reject) => {
            Project
            .find()
            .populate('team')
            .then(projects => resolve(projects))
            .catch(err => reject(err));
        });
    }
}