import React, { createContext, useContext, useReducer } from "react";
const reduxContext = createContext();

function reducer(rootState, action) {
  /** store.effect 调用 action.dispatch 时执行： */
  if (action.newRootState) return action.newRootState;

  /** sore.mutation 被调用时执行： */
  const newRootState = { ...rootState };
  const { key, payload, mutation } = action;
  if (!mutation) return newRootState;
  newRootState[key] = mutation(rootState[key], payload);
  return newRootState;
}

function createStore(rootModel) {
  const [rootState, dispatcher] = [{}, {}];

  Object.keys(rootModel).forEach(item => {
    rootState[item] = rootModel[item].state;
  });

  function createDispatcher(dispatch) {
    Object.keys(rootModel).forEach(item => {
      dispatcher[item] = {};
      // mutations
      const mutationList = rootModel[item].mutations || {};
      Object.keys(mutationList).forEach(unit => {
        dispatcher[item][unit] = payload => {
          dispatch({
            mutation: rootModel[item].mutations[unit],
            key: item,
            payload,
          });
        };
      });
      // effects
      const effectList = rootModel[item].effects || {};
      Object.keys(effectList).forEach(unit => {
        dispatcher[item][unit] = payload => {
          // action
          rootModel[item].effects[unit](rootState, {
            dispatch,
            key: item,
            payload,
            dispatcher,
          });
        };
      });
    });
  }

  function Provider({ children }) {
    const [store, dispatch] = useReducer(reducer, rootState);

    if (!Object.keys(dispatcher).length) createDispatcher(dispatch);

    return <reduxContext.Provider value={store}>{children}</reduxContext.Provider>;
  }

  function useModel(key = "master") {
    const rootState = useContext(reduxContext);
    if (!(key in rootState)) throw new Error(`${key} is not in model.`);

    return [rootState[key], dispatcher[key]];
  }

  function getModel(key = "master") {
    return rootState[key];
  }

  return { Provider, useModel, getModel };
}

export default createStore;
