const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    hobbies: { type: [String], required: true },
    personalityTraits: { type: [String], required: true },
});

module.exports = mongoose.model('Friend', FriendSchema);
