const Course = require('mongoose').model('Course');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Course
            .find()
            .populate('lectures')
            .then(courses => resolve(courses))
            .catch(err => reject(err));
        });
    },

    getTopThree: () => {
        return new Promise((resolve, reject) => {
            Course
            .find( { isPublic: true } )
            .populate('users')
            .sort( { users: 1 } )
            .limit(3)
            .then(courses => resolve(courses))
            .catch(err => reject(err));
        });
    },

    getAllPublic: () => {
        return new Promise((resolve, reject) => {
            Course
            .find( { isPublic: true } )
            .then(courses => resolve(courses))
            .catch(err => reject(err));
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            Course
            .findById(id)
            .then(course => resolve(course))
            .catch(err => reject(err));
        });
    },

    create: (body) => {
        return new Promise((resolve, reject) => {
            let { title, description, imageUrl, isPublic } = body;
            if (isPublic === 'on') {
                isPublic = true;
            }
            else {
                isPublic = false;
            }

            Course
            .create({
                title,
                description,
                imageUrl,
                isPublic
            })
            .then(course => resolve(course))
            .catch(err => reject(err));
        });
    },

    update: (courseId, body) => {
        let { title = null, description = null, imageUrl = null, isPublic = null } = body;
        return new Promise((resolve, reject) => {
            if (isPublic === 'on') {
                isPublic = true;
            }
            else {
                isPublic = false;
            }
            Course
            .updateOne({ _id: courseId }, { title, description, imageUrl, isPublic })
            .then(course => resolve(course))
            .catch(err => reject(err));
        });     
    } 
}