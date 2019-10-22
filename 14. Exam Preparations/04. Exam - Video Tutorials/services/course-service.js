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
            .sort( { users: -1 } )
            .limit(3)
            .then(courses => resolve(courses))
            .catch(err => reject(err));
        });
    },

    getAllPublic: (search) => {
        return new Promise((resolve, reject) => {            
            let query = {};
            if (search) {
              query = { title: { $regex: search } };
            }

            query = { ...query, isPublic: true };
            Course
            .find(query)
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

    getByIdWithLectures: (id) => {
        return new Promise((resolve, reject) => {
            Course
            .findById(id)
            .populate('lectures')
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
    },

    enroll: (courseId, userId) => {
        return new Promise((resolve, reject) => {
            Course
            .updateOne({ _id: courseId }, { $push: { users: userId } })
            .then(course => resolve(course))
            .catch(err => reject(err));
        });
    }
}