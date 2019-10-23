const teamService = require('../services/team-service');
const userService = require('../services/user-service');
const errorService = require('../services/error-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('teams/create');
        },

        teams: (req, res) => {
            let user = req.user;
            if (user.username === "admin") {            
                userService
                .getAll()
                .then(users => {
                    teamService
                        .getAll()
                        .then(teams => res.render('teams/teams', { users, teams }))
                        .catch(err => errorService.handleError(res, err, 'teams/teams'));
                })
                .catch(err => console.log(err));         
            }
            else {
                teamService
                .getTeamsWithProjectsAndMembers()
                .then(teams => res.render('teams/teams', { teams }))
                .catch(err => errorService.handleError(res, err, 'teams/teams'));                      
            }               
        }
    },

    post: {
        create: (req, res) => {
            teamService
                .create(req.body.name)
                .then(team => res.redirect('/teams'))
                .catch(err => errorService.handleError(res, err, 'teams/create'));
        },

        distribute: (req, res) => {
            let { userId, teamId } = req.body;
            userService
                .getById(userId)
                .then(user => {
                    if (user.teams.includes(teamId)) {
                        const err = 'User already participate in this team!';
                        errorService.handleError(res, err, 'teams/teams');
                        return;
                    }

                    userService
                        .distributeTeam(userId, teamId)
                        .then(() => res.redirect('/'))
                        .catch(err => errorService.handleError(res, err, 'teams/teams'));
                })
                .catch(err => errorService.handleError(res, err, 'teams/teams'));
        }        
    }
}