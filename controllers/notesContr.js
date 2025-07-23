import Note from "../models/NoteModel.js";
import User from "../models/UserModel.js";

// POST Create a new note
const createNote = async (req, res) => {
  try {
    const { content, userId } = req.body; // Destructure the request body to get note details

    if (!content || !userId) {
      return res.status(400).json({ message: "Content is required" }); // Validate input
    }

    const newNote = await Note.create({ content, userId: req.body.userId });

    res.status(201).json(newNote); // Send the created note as a response
  } catch (error) {
    res.status(500).json({ message: "Error creating the note" }); // Handle errors by sending a 500 status with an error message
  }
};

// GET all notes
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.findAll({ include: User }); // Fetch all notes from the database
    res.json(allNotes); // Send the notes as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch notes" }); // Handle errors by sending a 500 status with an error message
  }
};

// GET a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id, { include: User });
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT to update a note
const updateNote = async (req, res) => {
  try {
    const {
      body: { content },
      params: { id },
    } = req;

    if (!content) return res.status(400).json({ error: "content required" });

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    await note.update(req.body);

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    await note.destroy();

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createNote, getAllNotes, getNoteById, deleteNote, updateNote };
