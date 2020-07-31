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
        self._update();
      };
    });
    // effects
    Object.keys(effects || {}).map(item => {
      dispatcher[item] = function (payload) {
        effects[item](rootState, {
          key: item,
          payload,
          dispatcher, // manager 的 dispatcher 只是对应模型的 dispatcher
          next: self._update,
        });
      };
    });

    return dispatcher;
  },
  _removeListener(subKey) {
    delete this._subList[subKey];
  },
  _addListener(subKey, cb) {
    this._subList[subKey] = cb;
  },
  _update() {
    Object.getOwnPropertySymbols(this._subList).forEach(item => {
      this._subList[item]({});
    });
  },
};

const [storeList, rootState] = [{}, {}];

function createManager(models) {
  Object.keys(models).forEach(item => {
    storeList[item] = storeManager.init(item, models[item]);
  });
  Object.keys(models).forEach(item => {
    rootState[item] = models[item].state;
  });
}

function getStore(name) {
  const result = Object.keys(storeList).find(item => item === name);
  if (result) return storeList[result];
  else return "Not find!";
}

export { createManager, getStore };
