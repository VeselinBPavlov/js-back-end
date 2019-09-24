const Product = require('mongoose').model('Product');
const errorHandler = require('../utilities/error-handler')

module.exports = {
  index: (req, res) => {
    Product
      .find()
      .sort('size')
      .then(products => {
        let chicken = products.filter(p => p.category === 'chicken');
        let beef = products.filter(p => p.category === 'beef');
        let lamb = products.filter(p => p.category === 'lamb');
        res.render('home/index', { chicken, beef, lamb });
      }).catch((err) => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('/')
      });
  }
}  

