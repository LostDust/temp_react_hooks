import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxContext } from "@/store";
import { RouteView } from "@/router";

function Other(props) {
  const { token, dispatch } = useContext(reduxContext);
  const [info, setInfo] = useState("info");
  const { match, location } = props;

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
      <Link to="/other/child">child</Link>
      <span> || </span>
      <Link to="/other/null">null</Link>
      <RouteView {...{ match, location }} />
    </section>
  );
}

export default withRouter(Other);
