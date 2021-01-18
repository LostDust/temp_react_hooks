import React from "react";
import { NavLink } from "react-router-dom";
// import { useModel } from "#/provider";
import { useTake, getTake } from "#/manager";
import { RouteView } from "#/router";

function Other() {
  const [{ token }, { setState }] = useTake("auth");

  return (
    <section>
      <br />
      <span>token: </span>
      <input
        type="text"
        value={token}
        onChange={e => setState({ token: e.target.value })}
        placeholder="token"
      />
      <br />
      <br />
      <span>{token}</span>
      <br />
      <br />
      <nav className="nav-tabs">
        <NavLink to="/other/child" className="nav-link">
          child
        </NavLink>
        <NavLink to="/other/null" className="nav-link">
          null
        </NavLink>
      </nav>
      <RouteView />
    </section>
  );
}

export default Other;
