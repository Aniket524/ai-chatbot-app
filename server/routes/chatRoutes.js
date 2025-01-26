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

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching chat history' });
    }
});

// Send a Message and Get AI Response
router.post('/:friendId', authenticate, async (req, res) => {
    const { friendId } = req.params;
    const { message } = req.body;

    try {
        // Check if the friend exists
        const friend = await Friend.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        // Retrieve existing chat history, if any
        let chat = await Chat.findOne({ 
            userId: req.user._id, 
            friendId 
        });

        if (!chat) {
            // If no chat history exists, create a new one
            console.log('no chats found')
            chat = new Chat({
                userId: req.user._id,
                friendId,
                messages: [],
            });
        }

        // Add the user's message to the chat
        chat.messages.push({ sender: 'user', message });
        console.log(chat.messages)
        
        // Get AI-generated response based on chat history and personality traits
        const personalityTraits = friend.personalityTraits.join(", ");
        console.log(personalityTraits)
        const chatHistory = chat.messages.map(msg => `${msg.sender}: ${msg.message}`).join("\n");
        console.log(chatHistory)
        const aiResponse = await getAIResponse(chatHistory, personalityTraits,friend);
        console.log(aiResponse)

        // Add the AI's response to the chat
        chat.messages.push({ sender: 'friend', message: aiResponse });

        // Save the chat history in the database
        await chat.save();

        res.status(200).json({ message: aiResponse });
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

module.exports = router;
