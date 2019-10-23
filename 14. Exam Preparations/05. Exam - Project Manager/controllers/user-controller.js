const encryption = require('../util/encryption');
const userService = require('../services/user-service');
const teamService = require('../services/team-service');

module.exports = {
    get: {
        register: (req, res) => {
            res.render('users/register');
        },
        
        login: (req, res) => {
            res.render('users/login');
        },

        logout: (req, res) => {
            req.logout();
            res.redirect('/');
        },

        profile: (req, res) => {
            userService
                .getByIdWithTeams(req.params.id)
                .then(user => {
                    let projects = [];
                    user.teams.forEach(team => {
                        teamService
                            .getByIdWithProjects(team.id)
                            .then(team => {
                                projects = [...projects,...team.projects];
                            })
                            .catch(err => console.log(err));                            
                    });  
                    res.render('users/profile', { user, projects });                  
                })
                .catch(err => console.log(err));            
        }
    },

    post: {
        register: (req, res) => {
            const { username, firstName, lastName, imageUrl, password, repeatPassword} = req.body;
            if (password !== repeatPassword) {
                res.locals.globalError = 'Passwords must match!';
                res.render('users/register');
                return;
            }
            
            const salt = encryption.generateSalt();
            const hashedPass = encryption.generateHashedPassword(salt, password);
            
            userService
                .create(username, firstName, lastName, imageUrl, hashedPass, salt)
                .then(user => {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            console.log(e);
                            res.locals.globalError = e;
                            res.render('users/register');
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    res.locals.globalError = err;
                    res.render('users/register');
                });  
        },

        login: (req, res) => {
            const { username, password } = req.body;
    
            userService
                .getByUsername(username)
                .then(user => {
                    if (!user || !user.authenticate(password)) {
                        const err = 'Invalid user data!'
                        console.log(err);
                        res.locals.globalError = err;
                        res.render('users/register');
                        return;
                    }
                    req.logIn(user, (err, user) => {
                        if (err) {
                            console.log(err);
                            res.locals.globalError = err;
                            res.render('users/register');
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    res.locals.globalError = err;
                    res.render('users/register');
                });  
        },

        leave: (req, res) => {
            let userId = req.user._id;
            let teamId = req.params.id;

            userService
                .leaveTeam(userId, teamId)
                .then(() => res.redirect(`/profile/${userId}`))
                .catch((err) => {
                    console.log(err);
                    res.locals.globalError = err;
                    res.render('users/register');
                });  
        }
    }    
};