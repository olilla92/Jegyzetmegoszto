import express from "express";
import * as Notes from "../data/notes.js";
import * as Users from "../data/users.js";
import { auth } from "./usersRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  const notes = Notes.getNotes();
  res.status(200).json(notes);
});
router.get("/:id", (req, res) => {
  const note = Notes.getNoteById(+req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found!" });
  const user = Users.getUserById(note.userId);
  const data = {
    author: user.username,
    title: note.title,
    content: note.content,
    isPublic: note.isPublic,
  };
  res.status(200).json(data);
});

//-------------auth-------------------

router.post("/", auth, (req, res) => {
  const { title, content, isPublic } = req.body;
  if (!title || !content || !isPublic)
    return res.status(400).json({ message: "Missing some data!" });
  const saved = Notes.saveNote(req.userId, title, content, isPublic);
  const note = Notes.getNoteById(saved.lastInsertRowid);
  res.status(200).json(note);
});

router.put("/:id", auth, (req, res) => {
  const id = +req.params.id;
  let note = Notes.getNoteById(id);
  if (!note) return res.status(404).json({ message: "Note not found!" });
  const { title, content, isPublic } = req.body;
  if (!title || !content || !isPublic)
    return res.status(400).json({ message: "Missing some data!" });
  Notes.updateNote(id, title, content, isPublic);
  note = Notes.getNoteById(id);
  res.status(200).json(note);
});

router.delete("/:id", auth, (req, res) => {
  const id = +req.params.id;
  const note = Notes.getNoteById(id);
  if (!note) return res.status(404).json({ message: "Note not found!" });
  Notes.deleteNote(id);
  res.sendStatus(204);
});

export default router;
