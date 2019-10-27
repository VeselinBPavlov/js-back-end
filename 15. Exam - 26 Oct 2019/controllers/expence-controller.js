const expenceService = require('../services/expence-service');
const errorService = require('../services/error-service');
const userService = require('../services/user-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('expences/create');
        },

        details: (req, res) => {
            expenceService
                .getById(req.params.id)
                .then(expence => res.render('expences/report', { expence }))
                .catch(err => errorService.handleError(req, err, 'home/index'));
        }, 

        delete: (req, res) => {
            expenceService
                .delete(req.user.id, req.params.id)
                .then(() => res.redirect('/'))
                .catch(err => errorService.handleError(req, err, 'home/index'));
        }
    },

    post: {
        create: (req, res) => {
            let { merchant, total, category, description, isReport } = req.body;

            expenceService
                .create(merchant, total, category, description, isReport, req.user.id)
                .then(user => res.redirect('/'))
                .catch(err => errorService.handleError(req, err, 'expences/create')); 
        }
    }
}