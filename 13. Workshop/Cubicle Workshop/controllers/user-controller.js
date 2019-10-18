const encryption = require('../util/encryption');
const errorService = require('../services/error-service');
const userService = require('../services/user-service');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },

    registerPost: (req, res) => {
        const { username, password, repeatPassword} = req.body;
        if (password !== repeatPassword) {
            res.locals.globalError = 'Passwords must match!';
            res.render('users/register');
            return;
        }
        
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);
        
        userService
            .create(username, hashedPass, salt)
            .then(user => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err;
                        res.render('users/register', user);
                    } else {
                        res.redirect('/');
                    }
                });
            }).catch((err) => errorService.handleError(err, '/'));  
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },

    loginGet: (req, res) => {
        res.render('users/login');
    },
    
    loginPost: (req, res) => {
        const { username, password } = req.body;

        userService
            .get(username)
            .then(user => {
                if (!user || !user.authenticate(password)) {
                    errorHandler('Invalid user data');
                    return;
                }
                req.logIn(user, (err, user) => {
                    if (err) {
                        errorHandler(err);
                    } else {
                        res.redirect('/');
                    }
                });
            }).catch((err) => errorService.handleError(err, 'users/login'));  

            function errorHandler(e) {
                console.log(e);
                res.locals.globalError = e;
                res.render('users/login');
            }
    }
    
};