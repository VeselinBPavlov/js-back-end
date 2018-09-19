const auth = require('./auth');
const passport = require('passport'); 
const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.home.index);

  // User routes.
  app.get('/users/register', controllers.users.registerGet);
  app.post('/users/register', controllers.users.registerPost);
  app.get('/users/login', controllers.users.loginGet);
  app.post('/users/login', passport.authenticate('local'), controllers.users.loginPost);
  app.get('/users/logout', controllers.users.logout);
  app.get('/users/profile/me', auth.isAuthenticated, controllers.users.profile)

  // Car routes.
  app.get('/cars/create', auth.isInRole('Admin'), controllers.cars.createGet);
  app.post('/cars/create', auth.isInRole('Admin'), controllers.cars.createPost);
  app.get('/cars/all', controllers.cars.allGet);
  app.get('/cars/edit/:id', auth.isInRole('Admin'), controllers.cars.editGet);
  app.post('/cars/edit/:id', auth.isInRole('Admin'), controllers.cars.editPost);
  app.get('/cars/delete/:id', auth.isInRole('Admin'), controllers.cars.removePost);
  app.post('/cars/rent/:id', auth.isAuthenticated, controllers.cars.rentPost);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  })
}
