import { useEffect, useState } from "react";
import type { User } from "./types/User";
import apiClient from "./api/apiClient";
import { useParams } from "react-router-dom";
import "./App.css";

const Me = () => {
  const [me, setMe] = useState<User>();
  const { id } = useParams();
  useEffect(() => {
    apiClient
      .get(`/users/${Number(id)}`)
      .then((response) => setMe(response.data))
      .catch((result) => alert(result));
  });

  return (
    <>
      {me ? (
        <>
          <h1>Én</h1>
          <div>
            <h3>{me?.username}</h3>
          </div>
        </>
      ) : (
        <h1>Nincs ilyen felhasználó!</h1>
      )}
    </>
  );
};

export default Me;
