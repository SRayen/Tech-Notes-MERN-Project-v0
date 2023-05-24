const express = require("express");
const router = express.Router();
const notesControlller = require("../controllers/notesController");
const verifyJWT = require("../middleware/verifyJWT");

//the verified JWT middleware will be applied to all of the routes inside of this file
router.use(verifyJWT);

router
  .route("/")
  .get(notesControlller.getAllNotes)
  .post(notesControlller.createNewNote)
  .patch(notesControlller.updateNote)
  .delete(notesControlller.deleteNote);

module.exports = router;
