const express = require('express');
const Chat = require('../models/Chat');
const Friend = require('../models/Friend');
const authenticate = require('../middleware/authMiddleware');
const { getAIResponse } = require('../services/openaiService');
const router = express.Router();

// Get Chat History for a Specific Friend
router.get('/:friendId', authenticate, async (req, res) => {
    const { friendId } = req.params;

    try {
        // Check if the friend exists
        const friend = await Friend.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        // Fetch the chat history between the user and the selected friend
        const chat = await Chat.findOne({ 
            userId: req.user._id, 
            friendId 
        });

        if (!chat) {
            return res.status(404).json({ message: 'No chat history found' });
        }
        console.log(chat)
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching chat history' });
    }
});

// Backend route (modified to prevent duplicates)
router.post('/:friendId', authenticate, async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.friendId);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        let chat = await Chat.findOne({ userId: req.user._id, friendId: req.params.friendId });
        if (!chat) chat = new Chat({ userId: req.user._id, friendId: req.params.friendId, messages: [] });

        // Add user message
        const userMessage = { sender: 'user', message: req.body.message };
        chat.messages.push(userMessage);

        // Generate AI response
        const aiResponse = await getAIResponse(
            chat.messages.map(msg => `${msg.sender}: ${msg.message}`).join('\n'),
            friend.personalityTraits.join(', '),
            friend
        );

        // Add AI response
        const aiMessage = { sender: friend.name, message: aiResponse };
        chat.messages.push(aiMessage);
        
        await chat.save();
        res.status(200).json({ messages: [aiMessage] }); // Return only AI's response
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

module.exports = router;