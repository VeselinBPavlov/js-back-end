const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    
    app.get('/register', auth.isAnonymous, controllers.user.get.register);
    app.post('/register', auth.isAnonymous, controllers.user.post.register);
    app.get('/login', auth.isAnonymous, controllers.user.get.login);
    app.post('/login', auth.isAnonymous, controllers.user.post.login);
    app.get('/logout', auth.isAuthed, controllers.user.get.logout);
    app.post('/refill', auth.isAuthed, controllers.user.post.refill);
    app.get('/profile/:id', auth.isAuthed, controllers.user.get.profile);


    app.get('/create-expence', auth.isAuthed, controllers.expence.get.create);
    app.post('/create-expence', auth.isAuthed, controllers.expence.post.create);
    app.get('/details/:id', auth.isAuthed, controllers.expence.get.details);
    app.get('/delete/:id', auth.isAuthed, controllers.expence.get.delete);

    app.get('*', (req, res) => { res.render('404.hbs'); });
};