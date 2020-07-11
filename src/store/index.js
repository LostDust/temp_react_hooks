import { createContext } from "react";
import Provider from "@/store/Provider";

const reduxContext = createContext();

const initStore = { token: "token" };

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

export { reduxContext, reducer, initStore, Provider };
