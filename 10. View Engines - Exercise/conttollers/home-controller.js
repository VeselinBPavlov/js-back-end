const Book = require('../models/Book');

module.exports = {
    homeGet: (req, res) => {
        Book
            .count()
            .then(books => {
                res.render('home/home', { books });
            }).catch(err => {
                console.log(err);
            });
    }
}