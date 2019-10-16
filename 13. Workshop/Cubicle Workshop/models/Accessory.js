const mongoose = require('mongoose');
const Types = mongoose.SchemaTypes;

let accessorySchema = new mongoose.Schema({
  name: { type: Types.String, required: true },
  description: { type: Types.String, required: true },
  imageUrl: { type: Types.String, required: true },
  cubes: [{ type: Types.ObjectId, ref: 'Cube' }]
});

let Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;