import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import { useNavigate, useParams } from 'react-router-dom';
import { Nav, NavItem, Form, Container, CloseButton, Button } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import '../stylesheets/Settings.css';

const UserSettings = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        apiClient
            .get(`/users/${Number(id)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUsername(response.data.username ?? '');
                setPassword('');
            })
            .catch(() => toast.error('Az adatokat nem sikerült betölteni.'));
    }, [id]);

    const handleUserEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const u: User = {
            username,
            password,
        };

        apiClient
            .put(`/users/${Number(id)}`, u, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success('Sikeres módosítás!');
                navigate('/me');
            })
            .catch(() => toast.error('Sikertelen módosítás!'));
    };
    return (
        <>
            <Nav className="HeaderNav">
                <NavItem className="title">User Settings</NavItem>
            </Nav>
            <Sidebar className="sidebarNav">
                <Menu className="sidebarMenu">
                    <MenuItem onClick={() => navigate('/me')}>My Notes</MenuItem>
                    <MenuItem onClick={() => navigate('/new-note')}>New Note</MenuItem>
                    <MenuItem onClick={() => navigate(`/settings/${Number(id)}`)}>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                </Menu>
            </Sidebar>

            <Container className="UserData">
                <Form onSubmit={handleUserEdit}>
                    <Form.Group className="Closing">
                        <CloseButton
                            variant="white"
                            className="CloseButton"
                            onClick={() => navigate('/me')}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="UserName">New Username</Form.Label>
                        <Form.Control
                            className="inputBox"
                            type="text"
                            value={username}
                            placeholder="Enter new username here"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="PasswordText">New Password</Form.Label>
                        <Form.Control
                            className="inputBox"
                            type="password"
                            value={password}
                            placeholder="Enter new password here"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="SaveButtons">
                        <Button className="crtBtn" type="submit">
                            Update
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default UserSettings;
