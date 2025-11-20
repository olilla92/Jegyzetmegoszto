import { useEffect, useState } from 'react';
import { Form, Container, Button, Nav, NavItem, Col, Row } from 'react-bootstrap';
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
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        apiClient
            .get(`/notes/${Number(id)}`)
            .then((response) => {
                setTitle(response.data.title ?? '');
                setContent(response.data.content ?? '');
                setIsPublic(response.data.isPublic === true || response.data.isPublic === 'true');
            })
            .catch((result) => toast.error(result));
    }, [id]);

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const n: Note = {
            title,
            content,
            isPublic: isPublic ? 'true' : 'false',
        };

        apiClient
            .put(`/notes/${Number(id)}`, n, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => toast.success('Sikeres módosítás!'))
            .catch(() => toast.error('Sikertelen módosítás!'));
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
            <Container className="CreateNote">
                <Form onSubmit={handleEdit}>
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
                            type="textarea"
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
                                    value="true"
                                    checked={isPublic === true}
                                    onChange={() => setIsPublic(true)}
                                />
                                <Form.Check
                                    className="Control"
                                    type="radio"
                                    label="I keep it private."
                                    name="sharing"
                                    value="false"
                                    checked={isPublic === false}
                                    onChange={() => setIsPublic(false)}
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group className="createButtons">
                        <Button className="crtBtn" type="submit">
                            Update
                        </Button>
                        <Button className="crtBtn" onClick={() => navigate('/me')}>
                            Back
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default EditNote;
