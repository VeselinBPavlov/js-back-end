const courseService = require('../services/course-service');
const errorHandler = require('../util/error-handler');

module.exports = {
    index: (req, res) => {
      const user = req.user;
      if(!user) {
        courseService
          .getTopThree()
          .then(courses => res.render('home/index', { courses }))
          .catch(err => console.log(err));
      }
      else if(user.roles.includes('Admin')) {
        courseService
        .getAll()
        .then(courses => res.render('home/index', { courses }))
        .catch(err => console.log(err));
      }
      else {
        courseService
        .getAllPublic()
        .then(courses => res.render('home/index', { courses }))
        .catch(err => console.log(err));
      }    
    }
}