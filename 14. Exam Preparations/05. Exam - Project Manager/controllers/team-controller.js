const teamService = require('../services/team-service');
const userService = require('../services/user-service');

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
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));         
            }
            else {
                teamService
                .getTeamsWithProjectsAndMembers()
                .then(teams => res.render('teams/teams', { teams }))
                .catch(err => console.log(err));                      
            }               
        }
    },

    post: {
        create: (req, res) => {
            teamService
                .create(req.body.name)
                .then(team => res.redirect('/teams'))
                .catch(err => console.log(err));
        },

        distribute: (req, res) => {
            let { userId, teamId } = req.body;
            userService
                .getById(userId)
                .then(user => {
                    if (user.teams.includes(teamId)) {
                        res.redirect('/teams');
                        console.log('User already participate in this team!');
                        return;
                    }

                    userService
                        .distributeTeam(userId, teamId)
                        .then(() => res.redirect('/'))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }        
    }
}