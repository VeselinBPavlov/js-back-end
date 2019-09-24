const mongoose = require('mongoose');
const Types = mongoose.SchemaTypes;

let orderSchema = new mongoose.Schema({
  creator: { type: Types.ObjectId, required: true, ref: 'User' },
  product: { type: Types.ObjectId, required: true, ref: 'Product' },
  dateCreated: { type: Types.Date, default:Date.now },
  toppings: { type:[Types.String] },
  status: { type: Types.String, enum: ['Pending', 'In Progress', 'In Transit', 'Delivered'], default: 'Pending' }
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;