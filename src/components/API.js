import React, { useState, useEffect } from "react";

function API() {
  const url = "https://api.github.com/users";
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const respons = await fetch(url);
    const users = await respons.json();
    console.log(users);
    setUsers(users);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <ul className="users">
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id} className="user">
              <img src={avatar_url} alt={login}></img>
              <div>
                <h4>{login}</h4>
                <a href={html_url}>Profil</a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default API;
