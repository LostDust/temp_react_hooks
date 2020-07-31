# Manager 插件

- 功能：管理和读写全局状态
- 依赖：
  + useEffect
  + useRef
  +  useState

## 开始

- 在 `#/manager/models.js` 中配置状态模型；

```javascript
stateModel = {
  state: { [string]: any },
  mutations: { [string]: (modelState, payload) => newModelState } // 形如 reducer，负责对局部状态的处理
  effects: { [string]: (rootState, action) => any } // 负责异步操作或模型联动
}
```

- 将状态模型对象传入 createManager() 创建全局 storelist；
- 在页面中引入 API：`import { useTake, getTake } from "#/manager"`；
- useTake 用于在组件中获取状态与操作方法，getTake 则只用于获取状态，并且不会订阅状态的更新；

```javascript
/**
 * modelName: string
 * modelState: any
 * dispatcher: { ...mutations, ...effects }
 */
const [<modelState>, <dispatcher>] = useTake(<modelName>);
const [{ token }, { fetchInfo }] = useTake("auth");
const <modelState> = getTake(<modelName>);
const { token } = getTake("auth");
```

## 注意

- mutation 只会对当前模型的状态进行操作；
- 同模型下的 mutation 与 effect 应避免同名；
- useTake 与 getTake 方法的缺省参数为 `"master"`；
- 任意模型的更新不会触发其他模型的更新，因此性能会比 provider 插件更好；
- 该插件采用订阅者模式，因此不需要 `<Provider>` 绑定语境；