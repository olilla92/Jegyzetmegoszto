import { useState } from "react";
import type { User } from "../types/User.ts";
import apiClient from "../api/apiClient.ts";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const vissza = useNavigate();
  const logging = useNavigate();

  const Logging = () => {
    const u: User = {
      username,
      password,
    };
    apiClient.post("/login", u).then((response) => alert(response.status)).catch((result) => alert(result));
  };

  return (
    <>
      <h1>Bejelentkezés:</h1>
      <div className="form">
        <h3>Felhasználónév:</h3>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <h3>Jelszó:</h3>
        <input type="password" onChange={(e) => setPassword(e.target.value)} /><br/>
      </div>

      <button onClick={Logging} onDoubleClick={() => logging('/me')}>Belépés</button>
      <button onClick={() => vissza('/')}>Vissza</button>
    </>
  );
};

export default Login;