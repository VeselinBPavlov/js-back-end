const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
    name: { type: Types.String, required: true, unique: true },
    description: { type: Types.String, required: true, maxlength: [50, 'Description must be no longer than 50 symbols!'] },
    team: { type: Types.ObjectId, ref: 'Team' }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;