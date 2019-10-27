const encryption = require('../util/encryption');
const userService = require('../services/user-service');
const expenceService = require('../services/expence-service');
const errorService = require('../services/error-service');

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
                .getById(req.user.id)
                .then(user => {
                    expenceService
                        .getExpencesByUser(req.user.id)
                        .then(expences => {
                            let totalExpences = 0;
                            expences.forEach(expence => {
                                totalExpences += expence.total
                            });
                            let availableAmount = user.amount - totalExpences;
                            res.render('users/profile', { user, expences, availableAmount });
                        })
                        .catch(err => errorService.handleError(req, err, 'home/index'));
                })
                .catch(err => errorService.handleError(req, err, 'home/index'));
        }
    },

    post: {
        register: (req, res) => {
            const { username, amount, password, repeatPassword} = req.body;
            if (password.length < 8) {
                const err = 'Password should be at least 8 characters long!';
                errorService.handleError(res, err, 'users/register'); 
                return;
            }

            if (password !== repeatPassword) {
                const err = 'Password did not match!';
                errorService.handleError(res, err, 'users/register'); 
                return;
            }
            
            const salt = encryption.generateSalt();
            const hashedPass = encryption.generateHashedPassword(salt, password);
            
            userService
                .create(username, amount, hashedPass, salt)
                .then(user => {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            errorService.handleError(res, err, 'users/register'); 
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch(err => errorService.handleError(res, err, 'users/register'));  
        },

        login: (req, res) => {
            const { username, password } = req.body;
    
            userService
                .getByUsername(username)
                .then(user => {
                    if (!user || !user.authenticate(password)) {
                        const err = 'Invalid user data!'
                        errorService.handleError(res, err, 'users/register'); 
                        return;
                    }
                    req.logIn(user, (err, user) => {
                        if (err) {
                            errorService.handleError(res, err, 'users/register'); 
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch(err => errorService.handleError(res, err, 'users/register'));  
        },

        refill: (req, res) => {
            userService
                .getById(req.user.id)
                .then(user => {
                    let amount = +req.body.amount + user.amount;
                    userService
                        .addAmount(user._id, amount)
                        .then(user => res.redirect('/'))
                        .catch(err => errorService.handleError(req, err, 'home/index'));
                })
        }


    }    
};