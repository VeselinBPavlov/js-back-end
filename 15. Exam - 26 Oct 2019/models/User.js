const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { 
        type: Types.String, 
        required: true, 
        unique: true,
        minlength: [4, 'Username must be at least 4 characters long'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9]+/.test(v);
              },
              message: props => `${props.value} is not a valid username!`
        }
    },
    amount: { type: Types.Number, default: 0, min: [0, 'Amount cannot be less than zero!'] },
    hashedPass: { type: Types.String, required: true },
    salt: { type: Types.String, required: true },
    expenses: [{ type: Types.ObjectId, ref: 'Expence' }],
    roles: [{ type: Types.String }]
    
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return User.create({
            username: 'admin',
            amount: 0,
            expenses: [],
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
