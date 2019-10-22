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

    delete: (courseId, lectureId) => {
        return new Promise((resolve, reject) => {
            Lecture
            .deleteOne({ _id: lectureId })
            .then(lecture => {
                Course
                    .updateOne({ _id: courseId }, { $pull: { lectures: lectureId } })
                    .then(course => resolve(course))                
            })
            .catch(err => reject(err));
        });
    },

    getWithCourse: (lectureId) => {
        return new Promise((resolve, reject) => {
            Lecture
            .findById(lectureId)
            .populate('course')
            .then(lecture => resolve(lecture))
            .catch(err => reject(err));
        });
    }
}