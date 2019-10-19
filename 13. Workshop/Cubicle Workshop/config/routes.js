const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);
    
    app.get('/register', restrictedPages.isAnonymous, controllers.user.get.register);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.post.register);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.get.login);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.post.login);
    app.get('/logout', restrictedPages.isAuthed, controllers.user.get.logout);

    app.get('/add-cube', restrictedPages.isAuthed, controllers.cube.get.create);
    app.post('/add-cube', restrictedPages.isAuthed, controllers.cube.post.create);
    app.get('/edit/:id', restrictedPages.hasRole('Admin'), controllers.cube.get.edit);
    app.post('/edit/:id', restrictedPages.hasRole('Admin'), controllers.cube.post.edit);
    app.get('/delete/:id', restrictedPages.hasRole('Admin'), controllers.cube.get.delete);
    app.post('/delete/:id', restrictedPages.hasRole('Admin'), controllers.cube.post.delete);
    app.get('/details/:id', controllers.cube.get.details);

    app.get('/add-accessory', restrictedPages.isAuthed, controllers.accessory.get.create);
    app.post('/add-accessory', restrictedPages.isAuthed, controllers.accessory.post.create);
    app.get('/attach/:id', restrictedPages.isAuthed, controllers.accessory.get.attach);
    app.post('/attach/:id', restrictedPages.isAuthed, controllers.accessory.post.attach);

    app.get('*', (req, res) => { res.render('404.hbs'); });
};