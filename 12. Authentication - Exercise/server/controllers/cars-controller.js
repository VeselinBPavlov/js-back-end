const mongoose = require('mongoose');
const Car = require('mongoose').model('Car');
const Renting = require('mongoose').model('Renting');
const errorHandler = require('../utilities/error-handler')

module.exports = {
    createGet: (req, res) => {
      res.render('cars/create');
    },
    createPost: (req, res) => {
        let carReq = req.body

        if (+carReq.pricePerDay <= 0) {
          res.locals.globalError = 'Price per Day can not be less than 0'
          res.render('cars/create', carReq)
          return
        }

        Car
          .create({
            make: carReq.make,
            model: carReq.model,            
            imageUrl: carReq.imageUrl,
            color: carReq.color
          })
          .then((car) => {
            res.redirect('/cars/all')
          })
          .catch((err) => {
            let message = errorHandler.handleMongooseError(err)
            res.locals.globalError = message
            res.render('cars/create', carReq)
          })
    },
    allGet: (req, res) => {
        Car
            .find({ isRented: false })
            .then(cars => {
                res.render('cars/all', {cars})
            });
    },
    editGet: (req, res) => {
        let carId = req.params.id;
        Car
            .findById(carId)
            .then(car => {
                res.render('cars/edit',  car ); 
            });
    },
    editPost: (req, res) => {
        let carId = req.params.id;
        let updateData = req.body;
        Car
            .findByIdAndUpdate(carId, updateData)
            .then(car => {
                res.redirect('/cars/all'); 
            });
    },
    removePost: (req, res) => {
        let carId = req.params.id;
        Car
          .findByIdAndRemove(carId)
          .then(car => {
              res.redirect('/cars/all');
          });
    },
    rentPost: (req, res) => {
        let userId = req.user._id;
        let carId = req.params.id;
    
        Car
          .findById(carId)
          .then((car) => {
            if (car.isRented) {
              res.locals.globalError = 'Car is already rented!';
              res.render('cars/all');
              return;
            }
    
            Renting
              .create({
                user: userId,
                car: carId
              })
              .then((renting) => {
                car.isRented = true
                car
                  .save()
                  .then((car) => {
                    res.redirect('/users/profile/me')
                  })
              })
              .catch((err) => {
                let message = errorHandler.handleMongooseError(err)
                res.locals.globalError = message
                res.render('cars/all')
              })  //  if error must delete current renting
          })
          .catch((err) => {
            let message = errorHandler.handleMongooseError(err)
            res.locals.globalError = message
            res.render('cars/all')
          })
    }             
}