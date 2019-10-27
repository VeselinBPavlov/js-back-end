const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const expenceSchema = new mongoose.Schema({
    merchant : { 
        type: Types.String, 
        required: true,
        minlength: [4, 'Merchant must be at least 4 characters long'], 
    },
    date: { type: Types.Date, required: true, default: Date.now },
    total : { type: Types.Number, required: true,  min: [0, 'Total cannot be less than zero!']},
    category: { type: Types.String, required: true },
    description: { 
        type: Types.String, 
        required: true, 
        minlength: [10, "Description cannot be less than 10 characters long!"], 
        maxlength: [50, "Description cannot be more than 50 characters long!"] }, 
    isReport: { type: Types.Boolean, required: true, default: false },
    creator: { type: Types.ObjectId, required: true, ref: "User"}
});

const Expence = mongoose.model('Expence', expenceSchema);

module.exports = Expence;