import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT)`
).run();

export const getUsers = () => db.prepare("SELECT * FROM users").all();

export const getUserById = (id) =>
  db.prepare("SELECT * FROM users WHERE id = ?").get(id);

export const getUserByUserName = (username) =>
  db.prepare("SELECT * FROM users WHERE username = ?").get(username);

export const saveUser = (username, password) =>
  db
    .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    .run(username, password);

export const updateUser = (id, username, password) =>
  db
    .prepare("UPDATE users SET username = ?, password = ? WHERE id = ?")
    .run(username, password, id);

export const deleteUser = (id) =>
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
