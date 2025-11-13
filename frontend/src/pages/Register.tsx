import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const Registration = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users/register', { username, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            alert(`Your account is done ${user.username}! Login and have fun :)`);
            navigate('/me');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Registration failed!');
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
                    <Nav.Link className="linktext" onClick={() => navigate('/login')}>
                        Login
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="navitems">
                    <Nav.Link className="linktext" onClick={() => navigate('/register')}>
                        Registration
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <h1>Registration</h1>
            <Form onSubmit={Registration} className="formReg">
                <Form.Group className="formPoint" controlId="regUname">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="FormInput"
                        type="text"
                        value={username}
                        placeholder="Enter username here"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="formPoint" controlId="regPassword">
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
                    <Button className="regButton" type="submit">
                        Registration
                    </Button>
                    <Button className="regButton" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Register;
