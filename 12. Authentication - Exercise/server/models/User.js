const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const Types = mongoose.SchemaTypes;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let userSchema = new mongoose.Schema({
  username: { type: Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  rentedCars: [{ type: Types.ObjectId, ref: 'Car', default: [] }],
  salt: Types.String,
  hashedPass: Types.String,
  roles: [Types.String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User;

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')

    User.create({
      username: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
