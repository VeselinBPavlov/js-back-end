const Accessory = require('mongoose').model('Accessory');
const Cube = require('mongoose').model('Cube');

module.exports = {
    create: (body) => {
        return new Promise((resolve, reject) => {
            Accessory
            .create({
                name: body.name,
                description: body.description,
                imageUrl: body.imageUrl})
            .then(accessory => resolve(accessory))
            .catch(err => reject(err));
        });
    }, 

    getUnattachedAccessories: (cube) => {
        return Promise.all([cube, Accessory.find({ cubes: { $nin: [cube._id] } })]);
    },

    update: (cubeId, accessoryId) => {
        return Promise.all([
            Cube.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
            Accessory.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } })
        ]);
    }
}