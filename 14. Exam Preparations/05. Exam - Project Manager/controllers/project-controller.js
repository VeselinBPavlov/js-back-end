const teamService = require('../services/team-service');
const projectService = require('../services/project-service');

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
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));          
            }
            else {
                projectService
                .getAllWithTeams()
                .then(projects => res.render('projects/projects', { projects }))
                .catch(err => console.log(err));   
            }              
        }
    },

    post: {
        create: (req, res) => {
            projectService
                .create(req.body.name, req.body.description)
                .then(project => res.redirect('/projects'))
                .catch(err => console.log(err));
        },

        distribute: (req, res) => {
            let { teamId, projectId } = req.body;
            teamService
                .distributeProject(teamId, projectId)
                .then(() => res.redirect('/'))
                .catch(err => console.log(err));
        } 
    }
}