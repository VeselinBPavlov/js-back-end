const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let rentingSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: ObjectId,
    ref: 'Car',
    required: true
  }
});

let Renting = mongoose.model('Renting', rentingSchema, 'renting');

module.exports = Renting;