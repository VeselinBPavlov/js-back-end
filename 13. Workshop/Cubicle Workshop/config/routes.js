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

    app.get('/add-cube', restrictedPages.isAnonymous, controllers.cube.addCube);
    app.post('/add-cube', restrictedPages.isAnonymous, controllers.cube.addCubePost);
    app.get('/details/:id', restrictedPages.isAnonymous, controllers.cube.details);
    app.get('/attach/:id', restrictedPages.isAnonymous, controllers.cube.attachAccessory);
    app.post('/attach/:id', restrictedPages.isAnonymous, controllers.cube.attachAccessoryPost);

    app.get('/add-accessory', restrictedPages.isAnonymous, controllers.accessory.addAccessory);
    app.post('/add-accessory', restrictedPages.isAnonymous, controllers.accessory.addAccessoryPost);




    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};