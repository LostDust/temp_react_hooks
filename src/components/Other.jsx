import React, { useContext, useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { reduxContext } from "@/store";
import { RouteView } from "@/router";

function Other(props) {
  const { match, location } = props;
  const { token, dispatch } = useContext(reduxContext);
  const [info, setInfo] = useState("info");

  function changeValue(e, key) {
    const action = {
      type: "UPDATE",
      value: key,
      [key]: e.target.value,
    };
    dispatch(action);
  }

  return (
    <section>
      <br />
      <span>Auth: </span>
      <input
        type="text"
        value={token}
        onChange={e => changeValue(e, "token")}
        placeholder="token"
      />
      <span>{token}</span>
      <br />
      <input type="text" value={info} onChange={e => setInfo(e.target.value)} />
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

      <RouteView {...{ match, location }} />
    </section>
  );
}

export default withRouter(Other);
