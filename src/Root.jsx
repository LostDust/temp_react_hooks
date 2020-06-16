import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";

import RouteView from "@/router.jsx";

function Root() {
  return (
    <Router>
      <Link to="/home">home</Link>
      <span> || </span>
      <Link to="/other">other</Link>
      <RouteView></RouteView>
      {/* <RouteView {...props} /> 子路由 */}
    </Router>
  );
}

export default Root;
