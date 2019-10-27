const courseService = require('../services/course-service');
const errorService = require('../services/error-service');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('courses/create');
        },
        
        edit: (req, res) => {
            courseService
                .getById(req.params.id)
                .then(course => res.render('courses/edit', { course }))
                .catch(err => errorService.handleError(res, err, '/'));
        },

        details: (req, res) => {
            courseService
                .getByIdWithLectures(req.params.id)
                .then(course => res.render('courses/details', { course }))
                .catch(err => errorService.handleError(res, err, '/'));
        }
    },

    post: {
        create: (req, res) => {
            courseService
                .create(req.body)
                .then(course => res.redirect('/'))                
                .catch(err => errorService.handleError(res, err, 'courses/create'));
        },

        edit: (req, res) => {
            courseService
                .update(req.params.id, req.body)
                .then(course => res.redirect('/'))                
                .catch(err => errorService.handleError(res, err, 'courses/edit'));
        },

        enroll: (req, res) => {
            courseService
                .enroll(req.params.courseId, req.params.userId)
                .then(course => res.redirect(`/details/${req.params.courseId}`))
                .catch(err => errorService.handleError(res, err, '/'));
        }
    }
}