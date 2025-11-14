import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Me.css';
import {Nav, NavItem} from "react-bootstrap"
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

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
                    <Nav className='HeaderNav'>
                        <NavItem className='HeaderNavItem'>
                            <div>Welcome {me?.username}!</div>
                        </NavItem>
                    </Nav>

                    <Sidebar className="sidebarNav">
                        <Menu className='sidebarMenu'>
                            <MenuItem>My Notes</MenuItem>
                            <MenuItem>New Note</MenuItem>
                            <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                        </Menu>
                    </Sidebar>
                </>
            ) : (
                <h1>Nincs ilyen felhasználó!</h1>
            )}
        </>
    );
};

export default Me;
