import { useEffect, useState } from 'react';
import type { User } from '../types/User.ts';
import type { Note } from '../types/Note.ts';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Me.css';
import { Nav, NavItem, Row, Col, Card, Container } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const Me = () => {
    const [me, setMe] = useState<User>();
    const [myNotes, setMyNotes] = useState<Array<Note>>([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        apiClient
            .get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setMe(res.data))
            .catch(() => navigate('/login'));
        apiClient
            .get('/notes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setMyNotes(response.data))
            .catch((result) => alert(result));
    }, []);

    const DeleteNote = (noteId?: number) => {
        if (!noteId) {
            toast.error('Nincs ilyen jegyzet.');
            return;
        }
        apiClient
            .delete(`/notes/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success('A jegyzet sikeresen törlődött.');
                setMyNotes(myNotes.filter((n) => n.id !== noteId));
            })
            .catch(() => toast.error('Nem sikerült törölni a jegyzetet.'));
    };

    return (
        <>
            {me ? (
                <>
                    <Nav className="HeaderNav">
                        <NavItem className="HeaderNavItem">
                            <div>Welcome {me?.username}!</div>
                        </NavItem>
                        <NavItem className="SmallScreenMenu" onClick={() => navigate('/me')}>
                            My notes
                        </NavItem>
                        <NavItem className="SmallScreenMenu" onClick={() => navigate('/new-note')}>
                            New note
                        </NavItem>
                        <NavItem
                            className="SmallScreenMenu"
                            onClick={() => navigate(`/settings/${Number(me?.id)}`)}
                        >
                            Settings
                        </NavItem>
                        <NavItem
                            id="logout"
                            className="SmallScreenMenu"
                            onClick={() => navigate('/')}
                        >
                            Logout
                        </NavItem>
                    </Nav>

                    <Sidebar className="sidebarNav">
                        <Menu className="sidebarMenu">
                            <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                            <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                            <MenuItem onClick={() => navigate(`/settings/${Number(me?.id)}`)}>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                        </Menu>
                    </Sidebar>

                    <Container className="MyNoteContainer">
                        <Row className="MyNoteRow g-3" xs={12} sm={12} md={6} lg={4} xl={4} xxl={3}>
                            {myNotes && myNotes.filter((n) => n.userId == me.id).length > 0 ? (
                                myNotes
                                    .filter((n) => n.userId == me.id)
                                    .map((n) => (
                                        <Col
                                            key={n.id}
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={4}
                                            xl={4}
                                            xxl={3}
                                        >
                                            <Card className="notecard">
                                                <Card.Header className="Icons">
                                                    <FontAwesomeIcon
                                                        className="Pencil"
                                                        icon={faPencil}
                                                        onClick={() =>
                                                            navigate(`/edit-note/${n.id}`)
                                                        }
                                                    />
                                                    <FontAwesomeIcon
                                                        className="Delete"
                                                        icon={faDeleteLeft}
                                                        onClick={() => DeleteNote(n.id)}
                                                    />
                                                </Card.Header>
                                                <div className="noteContain">
                                                    <Card.Title>
                                                        <h2 className="noteconent">{n.title}</h2>
                                                    </Card.Title>
                                                    <Card.Body>
                                                        <p className="noteconent">{n.content}</p>
                                                        <p className="noteconent">{n.isPublic}</p>
                                                    </Card.Body>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))
                            ) : (
                                <div className="ifYouHaveNoNotes">
                                    <h2>Még nincsenek jegyzeteid!</h2>
                                </div>
                            )}
                        </Row>
                    </Container>
                </>
            ) : (
                <h1>Nincs ilyen felhasználó!</h1>
            )}
        </>
    );
};

export default Me;
