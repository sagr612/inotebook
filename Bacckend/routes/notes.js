const express = require("express");
const router = express.Router();
var getuser = require("../middleware/getuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1: get all the notes using get "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", getuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//route 2: add the notes using post "/api/notes/addnotes" login required
router.post(
  "/addnotes",
  [
    body("title", "enter a valid title").isLength({ min: 5 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  getuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");
    }
  }
);

//route 3- update and exiting note using put "/api/notes/updatenote" login required

router.put("/updatenote/:id", getuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new node object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
  }
});

//route 4- delete and exiting note using delete  "/api/notes/deletenote/:id" login required

router.delete("/deletenote/:id", getuser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
  }
});

module.exports = router;
