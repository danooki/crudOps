import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notesContr.js";

const notesRouter = Router();

notesRouter.post("/", createNote); // POST Create a new note
notesRouter.get("/", getAllNotes); // GET all notes
notesRouter.get("/:id", getNoteById); // GET note by ID
notesRouter.put("/:id", updateNote); // PUT Update an existing note by ID
notesRouter.delete("/:id", deleteNote); // DELETE a note by ID

export default notesRouter; // Export the notesRouter for use in other files
