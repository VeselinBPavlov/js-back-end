const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
  app.get('/', controllers.home.index);
  // User routes
  app.get('/users/register', controllers.users.registerGet);
  app.post('/users/register', controllers.users.registerPost);
  app.get('/users/login', controllers.users.loginGet);
  app.post('/users/login', controllers.users.loginPost);
  app.get('/users/logout', controllers.users.logout);

  // Product routes
  app.get('/product/create', auth.isInRole('Admin'), controllers.product.createGet);
  app.post('/product/create', auth.isInRole('Admin'), controllers.product.createPost);
  app.get('/product/edit/:id', auth.isInRole('Admin'), controllers.product.editGet);
  app.post('/product/edit/:id', auth.isInRole('Admin'), controllers.product.editPost);
  app.get('/product/delete/:id', auth.isInRole('Admin'), controllers.product.remove);

  // Order routes
  app.get('/product/order/:id', auth.isAuthenticated, controllers.order.placeGet);
  app.post('/product/order/:id', auth.isAuthenticated, controllers.order.placePost);
  app.get('/order/status', auth.isAuthenticated, controllers.order.statusGet);  
  app.get('/order/details/:id', auth.isAuthenticated, controllers.order.detailsGet);
  app.get('/order/manage', auth.isInRole('Admin'), controllers.order.manageGet);
  app.post('/order/manage', auth.isInRole('Admin'), controllers.order.managePost);  

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  })
}
