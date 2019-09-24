const home = require('./home-controller')
const users = require('./users-controller')
const product = require('./product-controller')
const order = require('../controllers/order-controller')

module.exports = {
  home: home,
  users: users,
  product: product,
  order: order
}
