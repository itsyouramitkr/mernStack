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

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // now checking the login user is updating no ohter can update other notes.

        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send({ error: "requested id does not found" });
        }
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed" });
            /*
            Here:
    
            notes.user.toString() = "68715f090af018cf10680177"
    
            req.user.id = "68715f090af018cf10680177" (from fetchuser middleware)
    
            ✅ They match → means the note belongs to the logged-in user.
    
            ❌ If they didn’t match, it would mean you're trying to update someone else’s note, which is not allowed.
            */
        }
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json({ notes });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }

});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send({ error: "requested id does not found" });
        }
        /// Allow deletion only if user own this notes
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed" });
            /*
            Here:
    
            notes.user.toString() = "68715f090af018cf10680177"
    
            req.user.id = "68715f090af018cf10680177" (from fetchuser middleware)
    
            ✅ They match → means the note belongs to the logged-in user.
    
            ❌ If they didn’t match, it would mean you're trying to update someone else’s note, which is not allowed.
            */
        }
        notes = await Notes.findByIdAndDelete(req.params.id)
        return res.json({ "success": "notes has been deleted", notes: notes });
        
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }

});

module.exports = router;