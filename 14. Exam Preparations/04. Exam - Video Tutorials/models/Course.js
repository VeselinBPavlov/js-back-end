const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const courseSchema = new mongoose.Schema({
    title: { type: Types.String, required: true, unique: true },
    description: { type: Types.String, required: true, maxlength: 50 },
    imageUrl: { type: Types.String, required: true },
    isPublic: { type: Types.Boolean, default: false },
    lectures: [{  type: Types.ObjectId, ref: 'Lecture' }],
    users: [{ type: Types.String }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
