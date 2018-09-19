const homeController = require('../conttollers/home-controller');
const booksController = require('../conttollers/books-controller');

module.exports = (app) => {
    app.get('/', homeController.homeGet);

    app.get('/addBook', booksController.addBookGet);
    app.post('/addBook', booksController.addBookPost);

    app.get('/viewAllBooks', booksController.viewAllGet);
    app.get('/details/:id', booksController.detailsGet);
}