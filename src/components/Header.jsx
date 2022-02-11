import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to={"/"}>Keeper</Link>{" "}
      </h1>

      <Link to={"/API"}>Api</Link>
    </header>
  );
}

export default Header;
