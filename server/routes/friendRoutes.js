const express = require('express');
const Friend = require('../models/Friend');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get My Friends
router.get('/my-friends', authenticate, async (req, res) => {
    try {
        const friends = await Friend.find({ userId: req.user._id });
        res.status(200).json(friends);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching friends' });
    }
});

// Create a New Friend
router.post('/create', authenticate, async (req, res) => {
    console.log(req.body)
    const { name, gender, hobbies, personalityTraits } = req.body;

    try {
        const newFriend = new Friend({
            userId: req.user._id,
            name,
            gender,
            hobbies,
            personalityTraits,
        });

        await newFriend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(500).json({ message: 'Error creating friend' });
    }
});

module.exports = router;
