const Product = require('mongoose').model('Product');
const errorHandler = require('../utilities/error-handler')
const allowedToppings = [
  'pickle', 
  'tomato', 
  'onion', 
  'lettuce', 
  'salad',
  'hot sauce',
  'extra sauce'
]

module.exports = {
    createGet: (req, res) => {
      res.render('orders/create')
    },
    createPost: (req, res) => {
      let productReq = req.body;

      if (+productReq.size < 17 || +productReq.size > 24) {
        res.locals.globalError = 'Size should be between 17 and 24 centimeters.';
        res.render('orders/create', productReq);
        return;
      }

      let toppings = productReq.toppings
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0 && allowedToppings.includes(e));

      Product
        .create({
          category: productReq.category,        
          imageUrl: productReq.imageUrl,
          size: +productReq.size,
          toppings: toppings
        })
        .then((product) => {
          res.redirect('/');
        }).catch((err) => {
          let message = errorHandler.handleMongooseError(err);
          res.locals.globalError = message;
          res.render('orders/create', productReq);
        });
    },
    editGet: (req, res) => {
      let productId = req.params.id;

      Product
        .findById(productId)
        .then(product => {
          res.render('orders/edit',  product );
        }).catch((err) => {
          let message = errorHandler.handleMongooseError(err);
          res.locals.globalError = message;
          res.render('/')
        });     
    },
    editPost: (req, res) => {
      let productId = req.params.id;
      let updateData = req.body;

      Product
          .findByIdAndUpdate(productId, updateData)
          .then(product => {
              res.redirect('/'); 
          }).catch((err) => {
            let message = errorHandler.handleMongooseError(err);
            res.locals.globalError = message;
            res.render('orders/edit')
          }); 
    }, 
    remove: (req, res) => {
      let productId = req.params.id;
      Product
        .findByIdAndRemove(productId)
        .then(car => {
            res.redirect('/');
        });
  }
}