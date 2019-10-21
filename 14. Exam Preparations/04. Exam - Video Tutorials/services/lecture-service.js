const Lecture = require('mongoose').model('Lecture');
const Course = require('mongoose').model('Course');

module.exports = {
    create: (courseId, body) => {
        return new Promise((resolve, reject) => {
            Lecture
            .create({
                title: body.title,
                videoUrl: body.videoUrl,
                course: courseId
            })
            .then(lecture => {
                Course
                .updateOne({ _id: courseId }, { $push: { lectures: lecture._id } })
                .then(course => resolve(course))
                .catch(err => reject(err));               
            })
            .catch(err => reject(err));            
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            Lecture
            .deleteOne({ _id: id })
            .then(lecture => resolve(lecture))
            .catch(err => reject(err));
        });
    }
}