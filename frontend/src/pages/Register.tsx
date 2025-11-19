import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Nav, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
            toast.success(`Your account is done ${user.username}! Login and have fun :)`);
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

            <Form className="formLoginRegister" onSubmit={Registration}>
                <Form.Label className="formTitle">Registration</Form.Label>
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
                        Registration
                    </Button>
                    <Button className="backButton" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Register;
