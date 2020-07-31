# Provider 插件

- 功能：管理和读写全局状态
- 依赖：
  + createContext
  + useReducer
  + useContext

## 开始

- 在 `#/provider/models.js` 中配置状态模型；

```javascript
stateModel = {
  state: { [string]: any },
  mutations: { [string]: (modelState, payload) => newModelState } // 形如 reducer，负责对局部状态的处理
  effects: { [string]: (rootState, action) => any } // 负责异步操作或模型联动
}
```

- 将状态模型对象传入 createStore() 创建全局 store；
- 在页面中引入 API：`import { Provider, useModel, getModel } from "#/provider"`；

- 在 page 层使用 `<Provider>` 为全局绑定语境；
- useModel  用于在组件中获取状态与操作方法，getModel 则只用于获取状态，并且不会订阅状态的更新；

```javascript
/**
 * modelName: string
 * modelState: any
 * dispatcher: { ...mutations, ...effects }
 */
const [<modelState>, <dispatcher>] = useModel(<modelName>);
const [{ token }, { fetchInfo }] = useModel("auth");
const <modelState> = getModel(<modelName>);
const { token } = getModel("auth");
```

## 注意

- mutation 只会对当前模型的状态进行操作；
- 同模型下的 mutation 与 effect 应避免同名；
- useModel 与 getModel 方法的缺省参数为 `"master"`；
- 每次全局状态更新都会使所有调用 useContext 的组件进行重渲染，请谨慎使用全局状态；
  + 建议在子组件渲染成本较高时，使用 React.memo、useMemo、useCallback 进行优化；
  + 或者使用 manager 插件管理部分全局状态；