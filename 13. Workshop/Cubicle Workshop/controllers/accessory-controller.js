const Accesorry = require('mongoose').model('Accessory');

module.exports = {
    addAccessory: (req, res) => {
      res.render('accessories/create');
    },

    addAccessoryPost: (req, res) => {
        let accessory = req.body;

        Accesorry
            .create({
                name: accessory.name,
                description: accessory.description,
                imageUrl: accessory.imageUrl
            }).then(accessory => {
                res.redirect('/');
            }).catch((err) => {
                let message = errorHandler.handleMongooseError(err);
                res.locals.globalError = message;
                res.render('accessories/create', accessoryReq);
            });        
    },

}