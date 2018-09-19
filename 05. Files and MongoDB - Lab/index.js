const mongoose = require('mongoose');
const Cat = require('./Cat');

mongoose
    .connect('mongodb://localhost:27017/cats')
    .then(() => {
        new Cat({
            name: 'Ivo',
            age: 21,
            color: "white"
        }).save()
            .then(cat => console.log(cat));
    });

