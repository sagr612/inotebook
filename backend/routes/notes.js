const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes.js");
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require('express-validator');


// Route 1: get all notes using  GET /api/notes/fetchallnotes  Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }


})

// Route 2: Add a new note using :  POST "/api/notes/addnotes" Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are errors return bad requet and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json({ savedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})


// Route 3: update an existing note using :  POST "/api/notes/addnotes" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a new note object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }


        //  find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// Route 3: update an existing note using :  POST "/api/notes/addnotes" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //  find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // alow deletion if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "success":"note is deleted", note:note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})


module.exports = router
