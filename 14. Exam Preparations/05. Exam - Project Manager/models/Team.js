const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const teamSchema = new mongoose.Schema({
    name: { type: Types.String, required: true, unique: true },
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    members: [{ type: Types.ObjectId, ref: 'User' }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;