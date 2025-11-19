import React, { useState } from 'react';
import apiClient from '../api/apiClient.ts';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/LoginRegister.css';
import { toast } from 'react-toastify';
import { Form, Button, Nav, Col, Row } from 'react-bootstrap';
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
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/me');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Login failed!');
        }
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

            <Form className="formLoginRegister" onSubmit={handleLogin}>
                <Form.Label className="formTitle">Login</Form.Label>
                <Form.Group as={Row} className="formUsername">
                    <Form.Label column className="formLabel">
                        Username
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            className="Control"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="formPassword">
                    <Form.Label column className="formLabel">
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            className="Control"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="formButtons">
                    <Button className="button" type="submit">
                        Login
                    </Button>
                    <Button className="backButton" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Login;
