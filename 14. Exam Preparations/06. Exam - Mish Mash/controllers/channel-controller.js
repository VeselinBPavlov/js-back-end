const channelService = require('../services/channel-service');
const errorService = require('../services/error-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('channels/create');
        },

        details: (req, res) => {
            channelService
                .getById(req.params.id)
                .then(channel => {
                    res.render('channels/details', { channel });
                }) 
                .catch(err => errorService.handleError(res, err, '/'));
        }
    }, 

    post: {
        create: (req, res) => {
            channelService
                .create(req.body)
                .then(channel => res.redirect('/'))
                .catch(err => errorService.handleError(res, err, '/create'));
        }
    }
}