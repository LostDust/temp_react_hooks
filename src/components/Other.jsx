import React from "react";
import { Link } from "react-router-dom";
import RouteView from "@/router.jsx";

function Other(props) {
  return (
    <section>
      <p>I&#x27;m other~</p>
      <Link to="/other/child">child</Link>
      <span> || </span>
      <Link to="/other/null">null</Link>
      <RouteView {...props} />
    </section>
  );
}

export default Other;
