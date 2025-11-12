import { Router } from "express";
import * as Users from "../data/users.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", auth, (req, res) => {
  const users = Users.getUsers();
  res.status(200).json(users);
});

router.get("/me", auth, (req, res) => {
  const user = Users.getUserById(+req.userId);
  if (!user) return res.status(404).json({ message: "User not found!" });
  res.json(user);
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing some data!" });
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const saved = Users.saveUser(username, hashedPassword);
  const user = Users.getUserById(saved.lastInsertRowid);
  res.status(201).json(user);
});
router.put("/:id", auth, (req, res) => {
  const id = +req.params.id;
  let user = Users.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found!" });
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing some data!" });
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);
  Users.updateUser(id, username, hashedPassword);
  user = Users.getUserById(id);
  res.status(200).json(user);
});

router.delete("/:id", auth, (req, res) => {
  const id = +req.params.id;
  const user = Users.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found!" });
  Users.deleteUser(id);
  res.sendStatus(204);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(401).json({ message: "Invalid credentials! 1" });
  const user = Users.getUserByUserName(username);
  console.log(user);
  if (!user) return res.status(401).json({ message: "Invalid credentials!" });
  req.userId = user.id;
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secret_key",
    { expiresIn: "30m" }
  );
  res.status(200).json(token);
});
export function auth(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized!" });
  const token = accessToken.split(" ")[1] || accessToken;
  const data = jwt.verify(token, "secret_key");
  const now = Math.floor(Date.now() / 1000);
  if (data?.exp < now)
    return res.status(403).json({ message: "Token expired!" });
  req.userId = data.id;
  next();
}

export default router;
