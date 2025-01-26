const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend', required: true },
    messages: [{
        sender: { type: String, required: true }, // sender can be 'user' or 'friend'
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
});

module.exports = mongoose.model('Chat', ChatSchema);
