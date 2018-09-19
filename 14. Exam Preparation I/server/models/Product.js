const mongoose = require('mongoose');
const Types = mongoose.SchemaTypes;

let productSchema = new mongoose.Schema({
  category: { type: Types.String, enum:['chicken', 'beef', 'lamb'], required: true },
  imageUrl: { type: Types.String, required: true },
  size: { type: Types.Number, required: true, min: 17, max: 24 },
  toppings: { type:[Types.String], default:[] }
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;