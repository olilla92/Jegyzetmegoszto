import React, { useState } from 'react';
import apiClient from '../api/apiClient.ts';
import { useNavigate } from 'react-router-dom';
import '../LoginRegister.css';
import '../App.css';
import { Form, Button, Nav } from 'react-bootstrap';
const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const belep = useNavigate();
    const reg = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users/login', { username, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            alert(`Welcome, ${user.username}`);
            navigate('/me');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Login failed!');
        }
    };

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

            <Form className="formLogin" onSubmit={handleLogin}>
                <Form.Group className="formPoint" controlId="loginUname">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="FormInput"
                        type="text"
                        value={username}
                        placeholder="Enter username here"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="formPoint" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="FormInput"
                        type="password"
                        value={password}
                        placeholder="Enter password here"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="formButtons">
                    <Button className="loginButtons" type="submit">
                        Login
                    </Button>
                    <Button className="loginButtons" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Login;
