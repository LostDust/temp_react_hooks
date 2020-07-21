import React from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";
// import { BrowserRouter as Router, NavLink } from "react-router-dom";

import { RouteView } from "@/router";
import { Provider } from "@/store";

function Root() {
  return (
    <Provider>
      <br />
      <br />
      <main style={{ marginLeft: "30%" }}>
        <Router>
          <nav className="nav-tabs">
            <NavLink to="/home" className="nav-link">
              home
            </NavLink>
            <NavLink to="/other" className="nav-link">
              other
            </NavLink>
          </nav>
          <br />
          <RouteView />
        </Router>
      </main>
    </Provider>
  );
}

export default Root;
