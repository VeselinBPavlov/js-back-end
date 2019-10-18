const Cube = require('mongoose').model('Cube');

module.exports = {
    get: (cubeId) => {
        return new Promise((resolve, reject) => {
            Cube
            .findById(cubeId)
            .then(cube => resolve(cube))
            .catch(err => reject(err));
        });
    },

    getAll: (from, to, search) => {
        return new Promise((resolve, reject) => {
            let query = {};
            if (search) {
              query = { ...query, name: { $regex: search } };
            }
            if (to) {
              query = { ...query, difficultyLevel: { $lte: +to } };
            }
            if (from) {
              query = { ...query, difficultyLevel: { ...query.difficultyLevel, $gte: +from } };
            }

            Cube
             .find(query)
             .then(cubes => resolve(cubes))
             .catch(err => reject(err));
        });
    },
    
    getWithAccessories: (cubeId) => {
        return new Promise((resolve, reject) => {
            Cube
            .findById(cubeId)
            .populate('accessories')
            .populate('creatorId')
            .then(cube => resolve(cube))
            .catch(err => reject(err));
        });
    },

    create: (cube, user) => {
        return new Promise((resolve, reject) => {
            Cube
            .create({
                name: cube.name,
                description: cube.description,
                imageUrl: cube.imageUrl,
                difficultyLevel: cube.difficultyLevel,
                creatorId: user._id})
            .then(cube => resolve(cube))
            .catch(err => reject(err));
        });
    }, 

    delete: (cubeId) => {
        return new Promise((resolve, reject) => {
            Cube
            .deleteOne({ _id: cubeId })
            .then(cube => resolve(cube))
            .catch(err => reject(err));
        });
    },

    update: (cubeId, body) => {
        let { name = null, description = null, imageUrl = null, difficultyLevel = null } = body;
        return new Promise((resolve, reject) => {
            Cube
            .updateOne({ _id: cubeId }, { name, description, imageUrl, difficultyLevel })
            .then(cube => resolve(cube))
            .catch(err => reject(err));
        });        
    },    

    optionsRender: (difficultyLevel) => {
        const options = [
            { title: '1 - Very Easy', selected: 1 === difficultyLevel },
            { title: '2 - Easy', selected: 2 === difficultyLevel },
            { title: '3 - Medium (Standard 3x3)', selected: 3 === difficultyLevel },
            { title: '4 - Intermediate', selected: 4 === difficultyLevel },
            { title: '5 - Expert', selected: 5 === difficultyLevel },
            { title: '6 - Hardcore', selected: 6 === difficultyLevel }
          ];
    
        return options;
    }
}