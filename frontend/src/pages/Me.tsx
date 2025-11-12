import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

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
            .get('/users/me', {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => setMe(res.data))
            .catch(() => navigate('/login'));
    }, []);

    if(!me) return <><h1>Loading...</h1></>;

    return (
        <>
            {me ? (
                <>
                    <h1>Én</h1>
                    <div>
                        <h3>{me?.username}</h3>
                        <p>{me?.id}</p>

                        <button onClick={() => {localStorage.removeItem('token');
                          navigate('/');
                        }}>
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
