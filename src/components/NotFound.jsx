import { Link } from "react-router-dom";
import React from "react";

function NotFound() {
  return (
    <section>
      <br />
      <h2>404</h2>
      <br />
      <Link to="/home">home</Link>
    </section>
  );
}

export default NotFound;
