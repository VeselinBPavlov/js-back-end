const cubeService = require('../services/cube-service');

module.exports = {
    index: (req, res) => {
        let cubes = cubeService.getAllCubes();
        res.render('index', cubes);
    },
    about: (req, res) => {
        res.render('about');
    }
}