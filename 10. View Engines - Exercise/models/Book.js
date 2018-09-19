const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    },
    imageUrl: { 
        type: mongoose.SchemaTypes.String, 
        required: true, 
    },
    year: { 
        type: mongoose.SchemaTypes.String,
    },
    author: {
        type: mongoose.SchemaTypes.String
    }
});
mongoose.model('Book', bookSchema);
module.exports = mongoose.model('Book');