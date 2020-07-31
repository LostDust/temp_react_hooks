import React from "react";

function Child() {
  return (
    <>
      <p>I&#x27;m child~</p>
    </>
  );
}

export default React.memo(Child);
