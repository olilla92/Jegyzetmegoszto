import { useState } from 'react';
import type { User } from '../types/User.ts';
import apiClient from '../api/apiClient.ts';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {Form, Button, Container} from "react-bootstrap"
const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const vissza = useNavigate();
    const logging = useNavigate();

    const Logging = () => {
        const u: User = {
            username,
            password,
        };
        apiClient
            .post('/login', u)
            .then((response) => alert(response.status))
            .catch((result) => alert(result));
    };

    return (
        <>
            <Container className='formContainer'>
                <Form className="formLogin">
                    <Form.Group className="formPoint" controlId="loginUname">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username here"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="formPoint" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password here"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="formPoint" controlId="loginButtons">
                        <Button onClick={Logging} onDoubleClick={() => logging('/me')}>
                            Login
                        </Button>
                        <Button onClick={() => vissza('/')}>Back</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default Login;
