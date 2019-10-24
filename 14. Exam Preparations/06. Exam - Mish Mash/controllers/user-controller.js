const encryption = require('../util/encryption');
const userService = require('../services/user-service');
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

        follow: (req, res) => {
            userService
                .follow(req.user.id, req.params.id)
                .then(() => res.redirect('/'))
                .catch(err => errorService.handleError(res, err, '/'));
        },

        unfollow: (req, res) => {
            userService
                .unfollow(req.user.id, req.params.id)
                .then(() => res.redirect(`/followed/${req.user.id}`))
                .catch(err => errorService.handleError(res, err, '/'));
        },

        myChannels: (req, res) => {
            userService
                .getUserWithChannels(req.params.id)
                .then(user => res.render('users/my-channels', { user }))
                .catch(err => errorService.handleError(res, err, '/'));
        }
    },

    post: {
        register: (req, res) => {
            const { username, email, password, repeatPassword} = req.body;
            if (password !== repeatPassword) {
                const err = 'Password did not match!';
                errorService.handleError(res, err, '/register'); 
                return;
            }
            
            const salt = encryption.generateSalt();
            const hashedPass = encryption.generateHashedPassword(salt, password);
            
            userService
                .create(username, email, hashedPass, salt)
                .then(user => {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            errorService.handleError(res, err, '/register'); 
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch(err => errorService.handleError(res, err, '/register'));  
        },

        login: (req, res) => {
            const { username, password } = req.body;
    
            userService
                .getByUsername(username)
                .then(user => {
                    if (!user || !user.authenticate(password)) {
                        const err = 'Invalid user data!'
                        errorService.handleError(res, err, '/register'); 
                        return;
                    }
                    req.logIn(user, (err, user) => {
                        if (err) {
                            errorService.handleError(res, err, '/register'); 
                        } else {
                            res.redirect('/');
                        }
                    });
                }).catch(err => errorService.handleError(res, err, '/register'));  
        }
    }    
};