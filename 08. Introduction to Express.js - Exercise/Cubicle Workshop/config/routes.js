const controllers = require('../controllers')

module.exports = (app) => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);

    app.get('/create', controllers.cube.createGet);
    app.post('/create', controllers.cube.createPost);
    
    app.all('*', (req, res) => {
        res.render('404');
    });
};