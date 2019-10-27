const userService = require('../services/user-service');
const errorService = require('../services/error-service');
const expenceService = require('../services/expence-service');


module.exports = {
    index: (req, res) => {
      if(req.user) {
        expenceService
          .getExpencesByUser(req.user.id)
          .then(expences => {
            res.render('home/index', { expences })
          })
          .catch(err => errorService.handleError(req, err, 'home/index'));
      } else {
        res.render('home/index')
      }      
    }
}