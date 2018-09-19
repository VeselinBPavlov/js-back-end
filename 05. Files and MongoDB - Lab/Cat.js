let mongoose = require('mongoose');

let catSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true }
});

let Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;