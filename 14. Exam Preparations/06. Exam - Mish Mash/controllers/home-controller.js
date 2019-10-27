const userService = require('../services/user-service');
const channelService = require('../services/channel-service');
const errorService = require('../services/error-service');

module.exports = {
    index: (req, res) => {
      if (req.user) {
        userService
        .getUserWithChannels(req.user.id)
        .then(user => {
            channelService
              .getAllTags(user)
              .then(tags => {
                channelService
                  .getChannels(user, tags)
                  .then(([channels, suggested, others]) => res.render('home/index', { channels, suggested, others }))
                  .catch(err => errorService.handleError(res, err, '/'));
              })              
              .catch(err => errorService.handleError(res, err, '/'));
        })
        .catch(err => errorService.handleError(res, err, '/'));      
      } else {
        res.render('home/index');
      }      
    }
}