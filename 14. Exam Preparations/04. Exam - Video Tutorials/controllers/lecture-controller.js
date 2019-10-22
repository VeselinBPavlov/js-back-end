const lectureService = require('../services/lecture-service');
const courseService = require('../services/course-service');

module.exports = {
    get: {
        panel: (req, res) => {
            courseService
                .getByIdWithLectures(req.params.id)
                .then(course =>  res.render('lectures/panel', { course }))
                .catch(err => console.log(err));
        },

        delete: (req, res) => {     
            lectureService
                .delete(req.params.courseId, req.params.lectureId)
                .then(course => res.redirect(`/add-lecture/${req.params.courseId}`))
                .catch(err => console.log(err));
        },

        play: (req, res) => {
            lectureService
                .getWithCourse(req.params.id)
                .then(lecture => {
                    courseService.getByIdWithLectures(lecture.course._id)
                    .then(course => res.render('lectures/video', { lecture, course }))                    
                })
                .catch(err => console.log(err));
        }
    },

    post: {
        panel: (req, res) => {
            lectureService
                .create(req.params.id, req.body)
                .then(lecture => res.redirect(`/add-lecture/${req.params.id}`))
                .catch(err => console.log(err));
        }
    }
}