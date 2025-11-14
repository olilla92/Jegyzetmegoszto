import { useEffect, useState } from 'react';
import { Form, Container, Button, Nav, NavItem } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import type { Note } from '../types/Note.ts';
import apiClient from '../api/apiClient';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { toast } from 'react-toastify';
import '../stylesheets/NewEdit.css';

const EditNote = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .get(`/notes/${Number(id)}`)
            .then((response) => {
                setTitle(response.data.title ?? '');
                setContent(response.data.content ?? '');
                setIsPublic(response.data.isPublic ?? '');
            })
            .catch((result) => alert(result));
    });

    const handleEdit = async (f: React.FormEvent) => {
        f.preventDefault();
        const e: Note = {
            title,
            content,
            isPublic,
        };
        apiClient
            .put(`/notes/${Number(id)}`, e)
            .then(() => toast.success("Sikeres módosítás!"))
            .catch(() => toast.error("Sikertelen módosítás!"));
        navigate('/me');
    };

    return (
        <>
            <Nav className="HeaderNav">
                <NavItem className="HeaderNavItem">Edit note</NavItem>
            </Nav>

            <Sidebar className="sidebarNav">
                <Menu className="sidebarMenu">
                    <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                    <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                    <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                </Menu>
            </Sidebar>
            <Container>
                <Form onSubmit={handleEdit}>
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
                        <Button type="submit">Update</Button>
                        <Button onClick={() => navigate('/me')}>Back</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default EditNote;
