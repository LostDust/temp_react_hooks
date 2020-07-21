import React, { useState } from "react";

function Home() {
  const [val, setVal] = useState(0);

  return (
    <section id="home">
      <br />
      <span>BaseURL: </span>
      <input type="text" value={HOST} readOnly placeholder="BaseURL" />
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
