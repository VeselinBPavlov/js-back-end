const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const channelSchema = new mongoose.Schema({
    name: { type: Types.String, required: true },
    type: { type: Types.String, required: true, enum: ["Game", "Motivation", "Lessons", "Radio", "Other"] },
    description: { type: Types.String, required: true },
    tags: { type: [Types.String] },
    followers: [{ type: Types.ObjectId, ref: "User" }]
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
