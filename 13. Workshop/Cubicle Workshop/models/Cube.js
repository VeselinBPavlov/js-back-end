const mongoose = require('mongoose');
const Types = mongoose.SchemaTypes;

let cubeSchema = new mongoose.Schema({
  name: { type: Types.String, required: true },
  description: { type: Types.String, required: true },
  imageUrl: { type: Types.String, required: true },
  difficultyLevel: { type: Types.Number, required: true },
  accessories: [{ type: Types.ObjectId, ref: 'Accessory' }],
  creatorId: { type: Types.ObjectId, ref: 'User' }
});

let Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;