const teamService = require('../services/team-service');
const projectService = require('../services/project-service');
const errorService = require('../services/error-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('projects/create');
        },

        projects: (req, res) => {
            let user = req.user;
            if (user.username === "admin") {
                teamService
                .getAll()
                .then(teams => {
                    projectService
                        .getAll()
                        .then(projects => res.render('projects/projects', { teams, projects }))
                        .catch(err => errorService.handleError(res, err, 'projects/projects'));
                })
                .catch(err => errorService.handleError(res, err, 'projects/projects'));          
            }
            else {
                projectService
                .getAllWithTeams()
                .then(projects => res.render('projects/projects', { projects }))
                .catch(err => errorService.handleError(res, err, 'projects/projects')); 
            }              
        }
    },

    post: {
        create: (req, res) => {
            projectService
                .create(req.body.name, req.body.description)
                .then(project => res.redirect('/projects'))
                .catch(err => errorService.handleError(res, err, 'projects/create'));
        },

        distribute: (req, res) => {
            let { teamId, projectId } = req.body;
            teamService
                .distributeProject(teamId, projectId)
                .then(() => res.redirect('/'))
                .catch(err => errorService.handleError(res, err, 'projects/projects'));
        } 
    }
}