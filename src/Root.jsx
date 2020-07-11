import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";

import { RouteView } from "@/router";
import { Provider } from "@/store";

function Root() {
  return (
    <Provider>
      <main style={{ marginLeft: "30%" }}>
        <Router>
          <Link to="/home">home</Link>
          <span> || </span>
          <Link to="/other">other</Link>
          <RouteView />
        </Router>
      </main>
    </Provider>
  );
}

export default Root;
