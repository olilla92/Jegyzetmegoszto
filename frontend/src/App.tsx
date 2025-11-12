import { useState, useEffect } from "react";
import type { Note } from "./types/Note.ts";
import apiClient from "./api/apiClient.ts";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const belep = useNavigate();
  const reg = useNavigate();

  useEffect(() => {
    apiClient
      .get("/notes")
      .then((response) => setNotes(response.data))
      .catch((result) => alert(result));
  }, []);
  return (
    <>
      <Navbar className="navbar" bg="dark">
        <Container fluid>
          <Nav className="NavLink">
            <Navbar.Brand className="linkek" href="#home">
              Home
            </Navbar.Brand>
            <Nav.Link className="linkek" onClick={() => belep("/login")}>
              Belépés
            </Nav.Link>
            <Nav.Link className="linkek" onClick={() => reg("/register")}>
              Regisztráció
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3}>
        <div className="jegyzetek">
          {notes.map((p) => (
            <div className="adatok">
              <h2>{p.title}</h2>
              <p className="jegyzet">{p.content}</p>
            </div>
          ))}
        </div>
      </Stack>
    </>
  );
}

export default App;
