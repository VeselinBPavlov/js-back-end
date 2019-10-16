const Cube = require('mongoose').model('Cube');

module.exports = {
    index: (req, res) => {
      Cube
        .find()
        .then(cubes => {
          res.render('home/index', { cubes })
        }).catch((err) => {
          let message = errorHandler.handleMongooseError(err)
          res.locals.globalError = message
          res.render('/')
        });
    },

    about: (req, res) => {
      res.render('home/about')
    }
}