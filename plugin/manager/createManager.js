const storeManager = {
  init(name, model) {
    const newObj = Object.create(this);
    newObj._name = name;
    newObj._state = model.state;
    newObj._dispatcher = this._initDispatcher(model, newObj);
    newObj._subList = {};

    return newObj;
  },
  _initDispatcher(model, self) {
    const { mutations, effects } = model;
    const dispatcher = {};
    // mutations
    Object.keys(mutations || {}).map(item => {
      dispatcher[item] = function (payload) {
        const newState = mutations[item](self._state, payload);
        self._state = newState;
        // 使用 _unupdate 属性标注在调用时不更新
        if (!payload._unupdate) self._update();
      };
    });
    // effects
    Object.keys(effects || {}).map(item => {
      dispatcher[item] = function (payload) {
        effects[item](rootState, {
          payload,
          dispatcher, // 只访问当前 model 的 dispatcher
          storeList, // 用于访问所有 store.dispatcher
          update: self._update.bind(self), // 触发当前 model 的订阅者更新
        });
      };
    });

    return dispatcher;
  },
  _addListener(subKey, cb) {
    this._subList[subKey] = cb;
  },
  _removeListener(subKey) {
    delete this._subList[subKey];
  },
  _update() {
    Object.getOwnPropertySymbols(this._subList).forEach(item => {
      // bug: 第一个卸载的 Vacancy 会异常地被找到 Symbol
      if (typeof this._subList[item] === "function") this._subList[item]({});
    });
  },
};

const [storeList, rootState] = [{}, {}];

function createManager(models) {
  Object.keys(models).forEach(item => {
    storeList[item] = storeManager.init(item, models[item]);
    // storeList.master = storeManager.init("master", models.master)
    rootState[item] = models[item].state;
    // rootState.master = models.master.state
  });
  // Object.keys(models).forEach(item => {  });
}

function getStore(name) {
  const result = Object.keys(storeList).find(item => item === name);
  if (result) return storeList[result];
  else return "Not find!";
}

export { createManager, getStore };
