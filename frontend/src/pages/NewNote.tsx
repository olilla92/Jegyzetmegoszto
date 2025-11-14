import { useState } from 'react';
import { Container, Form, Button, Nav, NavItem } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types/Note.ts';
import apiClient from '../api/apiClient.ts';
import { toast } from 'react-toastify';
import '../stylesheets/NewEdit.css'

const NewNote = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSave = () => {
        const n: Note = {
            title,
            content,
            isPublic,
        };
        apiClient
            .post('/notes', n)
            .then(() => toast.success('Az új jegyzet létrejött.'))
            .catch(() => toast.error('Sikertelen létrehozás. Próbáld meg újra.'));
    };

    return (
        <>
            <Nav className="HeaderNav">
                <NavItem className="HeaderNavItem">Create note</NavItem>
            </Nav>

            <Sidebar className="sidebarNav">
                <Menu className="sidebarMenu">
                    <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                    <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                    <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                </Menu>
            </Sidebar>
            <Container>
                <Form onSubmit={handleSave}>
                    <Form.Group>
                        <Form.Label>Cím</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            placeholder="Enter title here"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="textarea"
                            value={content}
                            placeholder="Enter content here"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Megosztja-e a jegyzetét?</Form.Label>
                        <Form.Control
                            type="radio"
                            value={String(isPublic)}
                            onChange={(e) => setIsPublic(Boolean(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit">Create</Button>
                        <Button onClick={() => navigate('/me')}>Back</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};
export default NewNote;
