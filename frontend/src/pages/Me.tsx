import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { Nav, Form } from 'react-bootstrap';

const Me = () => {
    const [me, setMe] = useState<User>();
    const navigate = useNavigate();
    const belep = useNavigate();
    const reg = useNavigate();

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
    }, []);

    if (!me)
        return (
            <>
                <h1>Loading...</h1>
            </>
        );

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
            {me ? (
                <>
                    <h1>Én</h1>
                    <div>
                        <h3>{me?.username}</h3>
                        <p>{me?.id}</p>

                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/');
                            }}
                        >
                            Kijelentkezés
                        </button>
                    </div>
                </>
            ) : (
                <h1>Nincs ilyen felhasználó!</h1>
            )}
        </>
    );
};

export default Me;
