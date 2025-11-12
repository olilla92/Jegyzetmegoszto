import { useState } from "react";
import apiClient from "../api/apiClient";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const vissza = useNavigate();
  const Registration = () => {
    const u: User = {
      username,
      password,
    };

    apiClient
      .post("/users", u)
      .then((response) => alert(response.status))
      .catch((result) => alert(result));
  };

  return (
    <>
      <h1>Regisztráció</h1>
      <h3>Felhasználónév:</h3>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <h3>Jelszó:</h3>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      
      <button onClick={Registration}>Regisztrálás</button>
      <button onClick={() => vissza("/")}>Vissza</button>
    </>
  );
};

export default Register;
