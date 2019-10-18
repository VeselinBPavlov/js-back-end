const cubeService = require('../services/cube-service');
const errorService = require('../services/error-service');

module.exports = {
    index: (req, res) => {
      const { from, to, search } = req.query;
      const user = req.user;
      cubeService
        .getAll(from, to, search)
        .then(cubes => res.render('home/index', { cubes, search, from, to, user }))
        .catch((err) => errorService.handleError(err, '/'));
    },

    about: (req, res) => {
      res.render('home/about');
    }
}