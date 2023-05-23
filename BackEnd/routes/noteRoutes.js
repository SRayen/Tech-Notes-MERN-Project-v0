const express = require("express");
const router = express.Router();
const notesControlller = require("../controllers/notesController");

router
  .route("/")
  .get(notesControlller.getAllNotes)
  .post(notesControlller.createNewNote)
  .patch(notesControlller.updateNote)
  .delete(notesControlller.deleteNote);

module.exports = router;
