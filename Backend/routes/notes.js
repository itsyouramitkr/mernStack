const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


router.post('/create', fetchuser, [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(404).json({ error: error.array() });
        }
        const notes = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id //// (user)this will get the id that are stored int he user collection(table)
            // “Save this note and link it to the user who is currently logged in (whose ID is in the token).”
        });
        res.send(notes);
        // const notesData = Notes(req.body)
        // notesData.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }

});

router.get('/fetchNotes', fetchuser, async (req, res) => {
    /*
    const data = {
      user: {
        id: user.id  // user._id from MongoDB
        }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    ✅ This creates a token that stores only the user's MongoDB ID (like "686f9344952fb40bedde90f0").

    🔓 When You Use fetchuser Middleware to Verify the Token:

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;  // sets req.user = { id: '686f9344952fb40bedde90f0' }
    ✅ This decodes the token and places the user.id back into req.user.

 */
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});

module.exports = router;