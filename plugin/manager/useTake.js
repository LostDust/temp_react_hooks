import { useEffect, useRef, useState } from "react";
import { getStore } from "./createManager";

function useTake(name = "master") {
  const store = getStore(name);
  const updateRef = useRef({
    shouldUpdate: true,
    setInit: false,
    subKey: Symbol(),
  });
  const [, setUpdateTrigger] = useState({});

  useEffect(() => {
    updateRef.current.shouldUpdate = true;

    return () => {
      updateRef.current.shouldUpdate = false;
      store._removeListener(updateRef.current.subKey);
    };
  }, []);
  // init
  if (!updateRef.current.setInit) {
    store._addListener(updateRef.current.subKey, setUpdateTrigger);
    updateRef.current.setInitial = true;
  }

  return [store._state, store._dispatcher];
}

export default useTake;
