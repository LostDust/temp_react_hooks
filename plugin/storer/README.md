# Store 插件

- 功能：管理和读写全局状态
- 依赖：
  + createContext
  + useReducer
  + useContext

## 开始

- 在 `#/store/index.js` 的 initStore 中配置初始状态与 dispatch；

- 在页面中引入 API：`import { Provider, useStore } from "#/store"`；

- 在 page 层使用 `<Provider>` 为全局绑定语境；
- useModel  用于在组件中获取状态与操作方法，getModel 则只用于获取状态，并且不会订阅状态的更新；

```javascript
const { ...<state>, dispatch } = useStore();
const { token, dispatch } = useStore();
dispatch({ type: "UPDATE", value: "tpken", token: <newState> });
```

## 注意

- dispatch 方法依据 action.type 来判断需要执行的操作；
- 该插件适合管理简单的状态模型，较为复杂的推荐使用 Provider 或 Manager；