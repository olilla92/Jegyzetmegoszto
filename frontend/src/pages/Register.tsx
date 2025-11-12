import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap"
import "../App.css";

const Register = () => {
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const Registration = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await apiClient.post('/users/register', {username, password});
      const {token, user } = response.data;
      localStorage.setItem('token', token);
      alert(`Welcome, ${user.username}`)
      navigate('/me')
    }catch(err: any){
      alert(err.response?.data?.message || 'Registration failed!')
    }
  };

  return (
      <>
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
