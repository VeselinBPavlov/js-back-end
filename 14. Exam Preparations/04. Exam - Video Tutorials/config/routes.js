const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    
    app.get('/register', auth.isAnonymous, controllers.user.get.register);
    app.post('/register', auth.isAnonymous, controllers.user.post.register);
    app.get('/login', auth.isAnonymous, controllers.user.get.login);
    app.post('/login', auth.isAnonymous, controllers.user.post.login);
    app.get('/logout', auth.isAuthed, controllers.user.get.logout);

    app.get('/create', auth.hasRole("Admin"), controllers.course.get.create);
    app.post('/create', auth.hasRole("Admin"), controllers.course.post.create);
    app.get('/edit/:id', auth.hasRole("Admin"), controllers.course.get.edit);
    app.post('/edit/:id', auth.hasRole("Admin"), controllers.course.post.edit);

    app.get('/add-lecture/:id', auth.hasRole("Admin"), controllers.lecture.get.panel);
    app.post('/add-lecture/:id', auth.hasRole("Admin"), controllers.lecture.post.panel); 
    app.get('/delete/:id', auth.hasRole("Admin"), controllers.lecture.get.delete);   

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};