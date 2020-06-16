import React, { useReducer } from "react";
import { reduxContext, reducer, initStore } from "@/store.js";

function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, initStore);

  return (
    <reduxContext.Provider value={{ ...store, dispatch }}>
      {children}
    </reduxContext.Provider>
  );
}

export default Provider;
