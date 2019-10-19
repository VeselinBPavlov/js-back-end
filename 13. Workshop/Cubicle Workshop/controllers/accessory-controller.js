const cubeService = require('../services/cube-service');
const errorService = require('../services/error-service');
const accessoryService = require('../services/accessory-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('accessories/create');
        },
        
        attach: (req, res, next) => {
            cubeService
                .get(req.params.id)
                .then(cube => accessoryService.getUnattachedAccessories(cube))
                .then(([cube, filterAccessories]) => res.render('accessories/attach', { cube, accessories: filterAccessories.length > 0 ? filterAccessories : null }))
                .catch(next);  
        }
    },

    post: {
        create: (req, res) => {
            accessoryService
                .create(req.body)
                .then(accessory => res.redirect('/'))
                .catch((err) => errorService.handleError(err, 'accessories/create'));         
        },        
    
        attach: (req, res, next) => {
            accessoryService
                .update(req.params.id, req.body.accessoryId)
                .then(() => res.redirect('/'))
                .catch(next);
        }
    }    
}