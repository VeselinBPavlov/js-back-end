const Team = require('mongoose').model('Team');
const Project = require('mongoose').model('Project');

module.exports = {
    create: (name)  => {
        return new Promise((resolve, reject) => {
            Team
                .create({
                    name,
                    projects: [],
                    members: []
                })
                .then(team => resolve(team))
                .catch(err => reject(err));
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            Team
            .find()
            .then(teams => resolve(teams))
            .catch(err => reject(err));
        });
    }, 

    getByIdWithProjects: (id) => {
        return new Promise((resolve, reject) => {
            Team
            .findById(id)
            .populate('projects')
            .then(team => resolve(team))
            .catch(err => reject(err));
        });
    },

    distributeProject: (teamId, projectId) => {
        return Promise.all([
            Team.updateOne({ _id: teamId }, { $push: { projects: projectId } }),
            Project.updateOne({ _id: projectId }, { team: teamId } )
        ]);
    },

    getTeamsWithProjectsAndMembers: () => {
        return new Promise((resolve, reject) => {
            Team
            .find()
            .populate('projects')
            .populate('members')
            .then(teams => resolve(teams))
            .catch(err => reject(err));
        });
    }
}