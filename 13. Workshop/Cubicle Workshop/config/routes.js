const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);
    
    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.get('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    app.get('/add-cube', restrictedPages.isAuthed, controllers.cube.addCube);
    app.post('/add-cube', restrictedPages.isAuthed, controllers.cube.addCubePost);
    app.get('/details/:id', controllers.cube.details);

    app.get('/edit/:id', restrictedPages.hasRole('Admin'), controllers.cube.edit);
    app.post('/edit/:id', restrictedPages.hasRole('Admin'), controllers.cube.editPost);
    app.get('/delete/:id', restrictedPages.hasRole('Admin'), controllers.cube.delete);
    app.post('/delete/:id', restrictedPages.hasRole('Admin'), controllers.cube.deletePost);

    app.get('/add-accessory', restrictedPages.isAuthed, controllers.accessory.addAccessory);
    app.post('/add-accessory', restrictedPages.isAuthed, controllers.accessory.addAccessoryPost);
    app.get('/attach/:id', restrictedPages.isAuthed, controllers.accessory.attachAccessory);
    app.post('/attach/:id', restrictedPages.isAuthed, controllers.accessory.attachAccessoryPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};