const cubeService = require('../services/cube-service');
const errorService = require('../services/error-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('cubes/create')
        },        
    
        edit: (req, res) => {
            cubeService
                .get(req.params.id)
                .then(cube => {
                    const options = cubeService.optionsRender(cube.difficultyLevel);
                    res.render('cubes/edit', { cube, options }); 
                }).catch((err) => errorService.handleError(err, '/'));  
        },

        delete: (req, res) => {
            cubeService
                .get(req.params.id)
                .then(cube => {
                    const options = cubeService.optionsRender(cube.difficultyLevel);
                    res.render('cubes/delete', { cube, options });
                }).catch((err) => errorService.handleError(err, '/'));  
        },

        details: (req, res) => {
            cubeService
                .getWithAccessories(req.params.id)
                .then(cube => res.render('cubes/details', { cube }))
                .catch((err) => errorService.handleError(err, '/'));  
        }
    },

    post: {
        create: (req, res) => {
            cubeService
                .create(req.body, req.user)
                .then(cube => res.redirect('/'))
                .catch((err) => errorService.handleError(err, 'cubes/add-cube'));        
        },      
    
        edit: (req, res) => {
            cubeService
                .update(req.params.id, req.body)        
                .then(cube => res.redirect('/'))
                .catch((err) => errorService.handleError(err, '/'));  
        },     
    
        delete: (req, res) => {      
            cubeService
                .delete(req.params.id)
                .then(() => { res.redirect('/'); })
                .catch((err) => errorService.handleError(err, '/'));  
        }
    }    
}