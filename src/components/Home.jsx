import React from "react";

function Home() {
  return (
    <section>
      <br />
      <span>BaseURL: </span>
      <input type="text" value={HOST} readOnly placeholder="BaseURL" />
    </section>
  );
}

export default Home;
