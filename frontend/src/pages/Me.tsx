import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import '../stylesheets/Me.css';

const Me = () => {
    const [me, setMe] = useState<User>();
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

    }, []);

    if (!me)
        return (
            <>
                <h1>Loading...</h1>
            </>
        );

    return (
        <>
            {me ? (
                <>
                    <div>
                        <Nav className="nav">
                            <Nav.Item>
                                <Nav.Link disabled className="title">
                                    Welcome {me?.username}
                                </Nav.Link>
                            </Nav.Item>
                            <Button
                                className="navButton"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/');
                                }}
                            >
                                Logout
                            </Button>
                        </Nav>
                    </div>
                </>
            ) : (
                <h1>Nincs ilyen felhasználó!</h1>
            )}
        </>
    );
};

export default Me;
