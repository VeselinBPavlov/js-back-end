const Product = require('mongoose').model('Product');
const errorHandler = require('../utilities/error-handler')
const Order = require('mongoose').model('Order');

module.exports = {
    placeGet: (req, res) => {
        let productId = req.params.id;

        Product
            .findById(productId)
            .then(product => {
                res.render('orders/customize-order', product);
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('orders/customize-order')
            });         
    }, 
    placePost: (req, res) => {
        let orderReq = req.body;
        let creator = req.user._id;
        let product = orderReq.product_id;
        let toppings = [];

        for (const key in orderReq) {
            if (orderReq.hasOwnProperty(key) === false) {
                continue;                
            }
            if (key !== creator && key !== 'product_id') {
                toppings.push(key);
            }
        }

        Order
            .create({
                creator: creator,
                product: product,
                toppings: toppings
            }).then(order => {
                res.redirect('/');
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('orders/customize-order', orderReq);
            });

    },
    statusGet: (req, res) => {
        let userId = req.user._id;

        Order
            .find({creator: userId})
            .populate('product')
            .then(orders => {                
                res.render('orders/order-status', {orders});
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('/')
              }); 
    },
    detailsGet: (req, res) => {
        const orderId = req.params.id;

        Order
            .findById(orderId)
            .populate('product')
            .then(order => {
                switch (order.status) {
                    case 'Pending': order.pending = true; break;
                    case 'In Progress': order.progress = true; break;
                    case 'In Transit': order.transit = true; break;
                    case 'Delivered': order.delivered = true; break;
                }
                res.render('orders/order-details', order);
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('/')
            }); 
    },
    manageGet: (req, res) => {
        Order
            .find()
            .populate('product')
            .then(orders => {  
                res.render('orders/order-status-admin', {orders});
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('/')
            }); 
    },
    managePost: (req, res) => {
        let updateData = req.body;

        for (let id in updateData) {
            Order
                .findByIdAndUpdate(id, {status: updateData[id]})
                .then()
                .catch((err) => {
                    let message = errorHandler.handleMongooseError(err);
                    res.locals.globalError = message;
                    res.render('/')
                  }); 
        }        
        res.redirect('/');
    }
}


