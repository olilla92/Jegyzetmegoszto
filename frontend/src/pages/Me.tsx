import { useEffect, useState } from 'react';
import type { User } from '../types/User.ts';
import type { Note } from '../types/Note.ts';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Me.css';
import { Nav, NavItem, Row, Col, Card, Container } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const Me = () => {
    const [me, setMe] = useState<User>();
    const [myNotes, setMyNotes] = useState<Array<Note>>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        apiClient
            .get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setMe(res.data))
            .catch(() => navigate('/login'));
        apiClient
            .get('/notes')
            .then((response) => setMyNotes(response.data))
            .catch((result) => alert(result));
    }, []);

    if (!me)
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    if (!myNotes)
        return (
            <>
                <p>Még nincsenek jegyzeteid!</p>
            </>
        );

    return (
        <>
            {me ? (
                <>
                    <Nav className="HeaderNav">
                        <NavItem className="HeaderNavItem">
                            <div>Welcome {me?.username}!</div>
                        </NavItem>
                    </Nav>

                    <Sidebar className="sidebarNav">
                        <Menu className="sidebarMenu">
                            <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                            <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                            <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                        </Menu>
                    </Sidebar>
                    <Container className="container">
                        <Row>
                            {myNotes
                                .filter((n) => n.userId == me.id)
                                .map((n) => (
                                    <Col>
                                        <Card
                                            className="notecard"
                                            onClick={() => navigate('/edit-note/:id')}
                                        >
                                            <div className="adatok">
                                                <Card.Title>
                                                    <h2 className="jegyzet">{n.title}</h2>
                                                </Card.Title>
                                                <Card.Body>
                                                    <p className="jegyzet">{n.content}</p>
                                                    <p className="jegyzet">{n.isPublic}</p>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
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
