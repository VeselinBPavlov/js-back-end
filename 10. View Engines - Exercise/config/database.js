const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//require('../models/ImageSchema');
//require('../models/TagSchema');

module.exports = (settings) => {
    mongoose.connect(settings.db, err => {
        if (err) {
            console.log(err);
            return;
        }
    
        console.log('MongoDB up and running...');
    }    
)};