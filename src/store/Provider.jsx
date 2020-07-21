import React, { useReducer } from "react";
import { reduxContext, reducer, initStore } from "@/store";

function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, initStore);
  // 惰性初始化
  // const [store, dispatch] = useReducer(reducer, initStore, init);
  // hook return init(initStore) 用于将计算 state 的逻辑提取到 reducer 外部

  return (
    <reduxContext.Provider value={{ ...store, dispatch }}>
      {children}
    </reduxContext.Provider>
  );
}

export default Provider;
