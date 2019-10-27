const courseService = require('../services/course-service');
const errorService = require('../services/error-service');

module.exports = {
    index: (req, res) => {
      const user = req.user;
      if(!user) {
        courseService
          .getTopThree()
          .then(courses => res.render('home/index', { courses }))
          .catch(err => errorService.handleError(res, err, '/'));
      }
      else if(user.roles.includes('Admin')) {
        courseService
        .getAll()
        .then(courses => res.render('home/index', { courses }))
        .catch(err => errorService.handleError(res, err, '/'));
      }
      else {
        let { search } = req.query;
        courseService
        .getAllPublic(search)
        .then(courses => res.render('home/index', { courses }))
        .catch(err => errorService.handleError(res, err, '/'));
      }    
    }
}