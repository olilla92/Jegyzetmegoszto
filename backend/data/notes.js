import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT, 
    content TEXT,
    isPublic BOOLEAN,
    FOREIGN KEY (userId) REFERENCES users(id))`
).run();

export const getNotes = () => db.prepare("SELECT * FROM notes").all();

export const getNoteById = (id) =>
  db.prepare("SELECT * FROM notes WHERE id = ? ").get(id);

export const getMyNotes = (userId) =>
  db.prepare("SELECT * FROM notes WHERE userId = ?").get(userId);

export const getNoteByTitle = (title) =>
  db.prepare("SELECT * FROM notes WHERE title = ?").get(title);

export const saveNote = (userId, title, content, isPublic) =>
  db
    .prepare(
      "INSERT INTO notes (userId, title, content, isPublic) VALUES (?, ?, ?, ?)"
    )
    .run(userId, title, content, isPublic);

export const updateNote = (id, title, content, isPublic) =>
  db
    .prepare(
      "UPDATE notes SET title = ?, content = ?, isPublic = ? WHERE id = ?"
    )
    .run(title, content, isPublic, id);

export const deleteNote = (id) =>
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
