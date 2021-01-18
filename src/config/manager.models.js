const delay = time => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 * mutation: (modelState, payload) => newPartState
 * 形如 reducer，负责对局部状态的处理
 */
function setState(modelState, payload) {
  return { ...modelState, ...payload };
}

/**
 * effect: (rootState, action) => any
 * 负责异步操作或模型联动
 */
async function fetchInfo(rootState, action) {
  /** action: { payload, dispatcher, storeList, storeList, update } */
  // 异步操作
  await delay(2000);
  // 参数获取
  action.payload;
  // 调用当前 store 的 mutation，_unupdate 表示不触发更新
  action.dispatcher.setState({ info: "hehe", _unupdate: true });
  // 访问其他 store 的 mutation
  action.storeList.master._dispatcher;
  // 触发当前 store 的订阅者更新
  action.update();
  // 触发其他 store 的订阅者更新
  // action.storeList.master._update();
}

/**
 * stateModel（分割 state）
 * state：局部状态
 * mutations：(modelState, payload) => newModelState 负责局部状态的处理
 * effects：(rootState, action) => any 负责异步操作或模型联动
 *   action = { next, key, payload, dispatcher }
 */
const master = {
  state: {
    info: "hello",
  },
  mutations: {
    setState,
  },
  effects: {
    fetchInfo,
  },
};

const auth = {
  state: {
    token: "token",
  },
  mutations: {
    setState,
  },
};

export default { master, auth };
