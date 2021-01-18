import React, { useState } from "react";
import { useTake, getTake } from "#/manager";

function Home() {
  const [val, setVal] = useState(0);
  const [{ token }] = useTake("auth");

  return (
    <section id="home">
      <br />
      <span>BaseURL: </span>
      <input type="text" value={HOST} readOnly placeholder="BaseURL" />
      <br />
      <p>info: {token}</p>
      <br />
      <br />
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={val}
        onChange={({ target }) => setVal(target.value)}
      />
    </section>
  );
}

export default Home;
