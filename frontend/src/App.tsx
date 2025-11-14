import { useState, useEffect } from 'react';
import type { Note } from './types/Note.ts';
import apiClient from './api/apiClient.ts';
import './stylesheets/App.css';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Nav } from 'react-bootstrap';

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
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" onClick={() => belep('/login')}>
                        Login
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" onClick={() => reg('/register')}>
                        Registration
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            
            <Row xs={1} md={2} lg={4}>
                {notes
                    .filter((p) => String(p.isPublic) == 'true')
                    .map((p) => (
                        <Col>
                            <Card className="notecard">
                                <div className="adatok">
                                    <Card.Title>
                                        <h2 className="jegyzet">{p.title}</h2>
                                    </Card.Title>
                                    <Card.Body>
                                        <p className="jegyzet">{p.content}</p>
                                        <p className="jegyzet">{p.isPublic}</p>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </>
    );
}

export default App;
