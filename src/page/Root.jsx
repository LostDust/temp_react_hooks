import React from "react";
// import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { HashRouter as Router, NavLink } from "react-router-dom";
import { RouteView } from "#/router";
import { Provider } from "#/provider";

function Root() {
  return (
    <Provider>
      <main style={{ marginLeft: "30%" }}>
        <br />
        <br />
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
