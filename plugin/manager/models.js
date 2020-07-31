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
  // 异步操作
  await delay(2000);
  // 调用 mutation（必须是 dispatcher 中经过封装的方法）
  action.dispatcher.setState({ info: "hehe" });
  // 手动触发页面更新
  // action.next();
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
