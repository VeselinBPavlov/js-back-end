const Cube = require('mongoose').model('Cube');
const Accessory = require('mongoose').model('Accessory');
const errorHandler = require('../util/error-handler');

module.exports = {
    addCube: (req, res) => {
      res.render('cubes/create')
    },

    addCubePost: (req, res) => {
        let cube = req.body;

        Cube
            .create({
                name: cube.name,
                description: cube.description,
                imageUrl: cube.imageUrl,
                difficultyLevel: cube.difficultyLevel
            }).then(cube => {
                res.redirect('/');
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('cubes/add-cube', cubeReq);
            });        
    },

    details: (req, res) => {
        let cubeId = req.params.id;

        Cube
            .findById(cubeId)
            .populate('accessories')
            .then(cube => {
               res.render('cubes/details', { cube })
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('/', cubeReq);
            });  
    },
    
    attachAccessory: (req, res, next) => {
        let cubeId = req.params.id;

        Cube
            .findById(cubeId)
            .then(cube => 
                Promise.all([cube, Accessory
                    .find()
                    .then(accessories => accessories.filter(a => a.cubes.includes(cubeId) === false))])
            ).then(([cube, filterAccessories]) => {
                res.render('accessories/attach', { cube, accessories: filterAccessories.length > 0 ? filterAccessories : null })
            }).catch(next);  
    },

    attachAccessoryPost: (req, res, next) => {
        let cubeId = req.params.id;
        let accessoryId = req.body.accessoryId;

        Promise.all([
            Cube.update({ _id: cubeId }, { $push: { accessories: accessoryId } }),
            Accessory.update({ _id: accessoryId }, { $push: { cubes: cubeId } })
        ]).then(() => {
            res.redirect('/');
        }).catch(next);
    }
}