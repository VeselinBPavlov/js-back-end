const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    
    app.get('/register', auth.isAnonymous, controllers.user.get.register);
    app.post('/register', auth.isAnonymous, controllers.user.post.register);
    app.get('/logout', auth.isAuthed, controllers.user.get.logout);
    app.get('/login', auth.isAnonymous, controllers.user.get.login);
    app.post('/login', auth.isAnonymous, controllers.user.post.login);
    app.get('/profile/:id', auth.isAuthed, controllers.user.get.profile);
    app.post('/leave/:id', auth.isAuthed, controllers.user.post.leave);

    app.get('/create-team', auth.hasRole("Admin"), controllers.team.get.create);
    app.post('/create-team', auth.hasRole("Admin"), controllers.team.post.create);
    app.get('/teams', auth.isAuthed, controllers.team.get.teams);
    app.post('/distribute-team', auth.hasRole("Admin"), controllers.team.post.distribute);
    
    app.get('/create-project', auth.hasRole("Admin"), controllers.project.get.create);
    app.post('/create-project', auth.hasRole("Admin"), controllers.project.post.create);
    app.get('/projects', auth.isAuthed, controllers.project.get.projects);
    app.post('/distribute-project', auth.hasRole("Admin"), controllers.project.post.distribute);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};