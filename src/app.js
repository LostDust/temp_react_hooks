import React from "react";
import ReactDOM from "react-dom";

import Root from "@/Root.jsx";
import Provider from "@/Provider.jsx";

ReactDOM.render(
  <Provider>
    <Root />
  </Provider>,
  document.querySelector("#app")
);
