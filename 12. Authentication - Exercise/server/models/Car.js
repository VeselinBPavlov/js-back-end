const mongoose = require('mongoose');
const Types = mongoose.SchemaTypes;

let carSchema = new mongoose.Schema({
  make: { type: Types.String, required: true },
  model: { type: Types.String, required: true },
  imageUrl: { type: Types.String, required: true },
  color: { type: Types.String },
  timesRented: { type: Types.String, default: 0 },
  isRented: { type: Types.Boolean, default: false }
});

let Car = mongoose.model('Car', carSchema);

module.exports = Car;