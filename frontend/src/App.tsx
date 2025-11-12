import { useState, useEffect } from 'react';
import type { Note } from './types/Note.ts';
import apiClient from './api/apiClient.ts';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Nav, Form } from 'react-bootstrap';

function App() {
    const [notes, setNotes] = useState<Array<Note>>([]);
    const belep = useNavigate();
    const reg = useNavigate();

    useEffect(() => {
        apiClient
            .get('/notes')
            .then((response) => setNotes(response.data))
            .catch((result) => alert(result));
    }, []);
    return (
        <>
            <Nav className="nav">
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" href="/">
                        Főoldal
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" onClick={() => belep('/login')}>
                        Belépés
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" onClick={() => reg('/register')}>
                        Regisztráció
                    </Nav.Link>
                </Nav.Item>
                <Form className="navitems">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="searchbar"
                        aria-label="Search"
                    ></Form.Control>
                </Form>
            </Nav>

            <Row xs={1} md={2} lg={4} className="container">
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card className="notecard">
                            {notes.map((p) => (
                                <div className="adatok">
                                    <Card.Title>
                                        <h2 className="jegyzet">{p.title}</h2>
                                    </Card.Title>
                                    <Card.Body>
                                        <p className="jegyzet">{p.content}</p>
                                    </Card.Body>
                                </div>
                            ))}
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default App;
