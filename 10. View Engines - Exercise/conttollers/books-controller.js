const Book = require('../models/Book');

module.exports = {
    addBookGet: (req, res) => {
        res.render('books/addBook');
    },
    addBookPost: (req, res) => {
        let book = req.body;

        if (!book.title || !book.imageUrl) {         
            res.render('books/addBook',  book );
        }

        Book.create(book).then(() => {
            res.redirect('/')
        })
    },
    viewAllGet: (req, res) => {
        Book
            .find()
            .sort('-year')
            .then(books => {
                res.render('books/viewAll', { books })
            });
    },
    detailsGet: (req, res) => {
        const id = req.params.id;
        Book
            .findById(id)
            .then(book => {
                res.render('books/details', book);
            });
    }
}