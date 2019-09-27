const Cube = require('../models/cube');
const uniqid = require('uniqid');
const cubeService = require('../services/cube-service');

module.exports = {
    createGet: (req, res) => {
      res.render('create');
    },

    createPost: (req, res) => {
        let cubeBody = req.body;        
        let cube = new Cube(uniqid(), cubeBody.name, cubeBody.description, cubeBody.imageUrl, +cubeBody.difficultyLevel);         
        cubeService.addCube(cube);            
        res.redirect('/');
    }
}