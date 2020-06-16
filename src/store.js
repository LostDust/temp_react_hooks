import { createContext } from "react";

const reduxContext = createContext();

const initStore = { token: "hello" };

function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case "UPDATE":
      newState[action.value] = action[action.value];
      return newState;
    default:
      return state;
  }
}

export { reduxContext, reducer, initStore };
