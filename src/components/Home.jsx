import React, { useContext } from "react";
import { reduxContext } from "@/store.js";

function Home() {
  const { token, dispatch } = useContext(reduxContext);
  function changeValue(e, key) {
    const action = {
      type: "UPDATE",
      value: key,
      [key]: e.target.value
    };
    dispatch(action);
  }

  return (
    <div>
      <br />
      <input
        type="text"
        value={token}
        onChange={e => changeValue(e, "token")}
        placeholder="password"
      />
      <p>{token}</p>
    </div>
  );
}

export default Home;
