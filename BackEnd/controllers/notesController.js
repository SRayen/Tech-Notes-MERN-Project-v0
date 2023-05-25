const Note = require("../models/Note");
const User = require("../models/User");

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
  const notes = await Note.find().lean();
  // If no notes
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  // Add username to each note before sending the response
  /* Promise.all() handles multiple asynchronous operations concurrently. The Promise.all() method 
  takes an array of promises and returns a new promise that resolves to an array of the resolved values of
   the input promises, in the same order as the origin*/
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
  res.json(notesWithUser);
};

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = async (req, res) => {
  console.log(req.body);
  const { user, title, text } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for duplicate title
  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Create and store the new user
  const newNote = Note.findOne({ title }).then((n) => console.log("n", n));
  console.log("new note", newNote);
  const note = await Note.create({ user, title, text }).catch((e) => {
    console.log(e);
  });
  console.log(note);
  if (note) {
    //created
    res.status(201).json({ message: `New note ${title} created` });
  } else {
    res.status(400).json({ message: `Invalid note data received` });
  }
};

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = async (req, res) => {
  const { id, user, title, text, completed } = req.body;
  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Confirm note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }
  // Check for duplicate title
  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }
  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;
  const updatedNote = await note.save();

  res.json(`'${updatedNote.title}' updated`);
};

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Note ID Required" });
  }

  // Confirm note exists to delete
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();
  const reply = `Note ${result.title} with ID ${result._id} deleted`;
  res.json(reply);
};

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
