const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const lectureSchema = new mongoose.Schema({
    title: { type: Types.String, required: true },
    videoUrl: { type: Types.String, required: true },
    course: {  type: Types.ObjectId, ref: 'Course' }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;