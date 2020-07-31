import React from "react";
import { NavLink } from "react-router-dom";
import { useModel } from "#/provider";
import { useTake, getTake } from "#/manager";
import { RouteView } from "#/router";

function Other() {
  const [{ info }, { setState }] = useTake("master");

  return (
    <section>
      <br />
      <span>Auth: </span>
      <input
        type="text"
        value={info}
        onChange={e => setState({ info: e.target.value })}
        placeholder="token"
      />
      <br />
      <span>{info}</span>
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
