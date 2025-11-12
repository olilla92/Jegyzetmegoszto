import { useState } from 'react';
import type { User } from '../types/User.ts';
import apiClient from '../api/apiClient.ts';
import { useNavigate } from 'react-router-dom';
import '../LoginRegister.css';
import { Form, Button } from 'react-bootstrap';
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
            <Form className="formLogin">
                <Form.Group className="formPoint" controlId="loginUname">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="FormInput"
                        type="text"
                        placeholder="Enter username here"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="formPoint" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="FormInput"
                        type="password"
                        placeholder="Enter password here"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="formButtons">
                    <Button
                        className="loginButtons"
                        onClick={Logging}
                        onDoubleClick={() => logging('/me')}
                    >
                        Login
                    </Button>
                    <Button className="loginButtons" onClick={() => vissza('/')}>
                        Back
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Login;
