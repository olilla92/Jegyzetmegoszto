import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import '../App.css';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const belep = useNavigate();
    const reg = useNavigate();

    const Registration = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/users/register', { username, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            alert(`Welcome, ${user.username}`);
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
            <Form onSubmit={Registration}>
                <h1>Regisztráció</h1>
                <h3>Felhasználónév:</h3>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                <h3>Jelszó:</h3>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />

                <button onClick={Registration}>Regisztrálás</button>
                <button onClick={() => navigate('/')}>Vissza</button>
            </Form>
        </>
    );
};

export default Register;
