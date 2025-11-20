import { useState } from 'react';
import { Container, Form, Button, Nav, NavItem, Row, Col, CloseButton } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types/Note.ts';
import apiClient from '../api/apiClient.ts';
import { toast } from 'react-toastify';
import '../stylesheets/NewEdit.css';

const NewNote = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const n: Note = {
            title,
            content,
            isPublic: isPublic ? 'true' : 'false',
        };
        apiClient
            .post('/notes', n, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => toast.success('Az új jegyzet létrejött.'))
            .catch(() => toast.error('Sikertelen létrehozás. Próbáld meg újra.'));
    };

    return (
        <>
            <Nav className="HeaderNav">
                <NavItem className="title">Note writing</NavItem>
            </Nav>

            <Sidebar className="sidebarNav">
                <Menu className="sidebarMenu">
                    <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                    <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                    <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                </Menu>
            </Sidebar>

            <Container className="CreateNote">
                <Form onSubmit={handleSave}>
                    <Form.Group className="Closing">
                        <CloseButton
                            variant="white"
                            className="CloseButton"
                            onClick={() => navigate('/me')}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="createTitle">Title</Form.Label>
                        <Form.Control
                            className="inputBox"
                            type="text"
                            value={title}
                            placeholder="Enter title here"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="createTitle">Content</Form.Label>
                        <Form.Control
                            className="inputBox"
                            as="textarea"
                            type="text"
                            value={content}
                            placeholder="Enter content here"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <fieldset>
                        <Form.Label as="legend" column className="isPublicTitle">
                            Do you want to share your note?
                        </Form.Label>
                        <Form.Group as={Row} className="PublicOrNot">
                            <Col sm={10}>
                                <Form.Check
                                    className="Control"
                                    type="radio"
                                    label="I share my note."
                                    name="sharing"
                                    value={String(isPublic)}
                                    onChange={(e) => setIsPublic(e.target.value === 'true')}
                                />
                                <Form.Check
                                    className="Control"
                                    type="radio"
                                    label="I keep it private."
                                    name="sharing"
                                    value={String(isPublic)}
                                    onChange={(e) => setIsPublic(e.target.value === 'true')}
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group className="createButtons">
                        <Button className="crtBtn" onClick={() => navigate('/me')} type="submit">
                            Create
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};
export default NewNote;
