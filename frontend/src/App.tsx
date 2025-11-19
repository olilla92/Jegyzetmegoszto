import { useState, useEffect } from 'react';
import type { Note } from './types/Note.ts';
import apiClient from './api/apiClient.ts';
import './stylesheets/App.css';
import { useNavigate } from 'react-router-dom';
import { Nav, Container, Card, Row, Col } from 'react-bootstrap';

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

    const generateCard = (n: Note) => {
        return (
            <Card className="cardContainer">
                <Card.Body>
                    <Card.Title className="cardsOfnotes">{n.title}</Card.Title>
                    <Card.Text className="cardsOfnotes" id='cardContent'>{n.content}</Card.Text>
                </Card.Body>
            </Card>
        );
    };

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

            <Container className="ContainerofCards">
                <Row xl={4} lg={3} md={2} sm={1} xs={1}>
                    {notes
                        .filter((n) => String(n.isPublic) == 'true')
                        .map((n) => (
                            <Col>{generateCard(n)}</Col>
                        ))}
                </Row>
            </Container>
        </>
    );
}

export default App;
