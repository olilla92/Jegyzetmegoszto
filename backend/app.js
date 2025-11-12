import express from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/users", usersRoutes);
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
