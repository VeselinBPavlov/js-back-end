const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    
    app.get('/register', auth.isAnonymous, controllers.user.get.register);
    app.post('/register', auth.isAnonymous, controllers.user.post.register);
    app.get('/login', auth.isAnonymous, controllers.user.get.login);
    app.post('/login', auth.isAnonymous, controllers.user.post.login);
    app.get('/logout', auth.isAuthed, controllers.user.get.logout);
    app.get('/follow/:id', auth.isAuthed, controllers.user.get.follow);
    app.get('/followed/:id', auth.isAuthed, controllers.user.get.myChannels);
    app.get('/unfollow/:id', auth.isAuthed, controllers.user.get.unfollow);

    app.get('/create', auth.hasRole("Admin"), controllers.channel.get.create);
    app.post('/create', auth.hasRole("Admin"), controllers.channel.post.create);
    app.get('/details/:id', auth.isAuthed, controllers.channel.get.details);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};