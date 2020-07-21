# 一个自用的 React 脚手架（hooks 版）

[toc]

## 路由配置

- 在 `./src/router/config.js` 中配置规则；
- path(str)：路由对应的路径，children 下的 path 会与父级拼接；
- component(jsx)：路由对应的组件；
- children([])：路由嵌套时的子路由规则；
- exact：严格匹配路径；
- redirect(jsx)：重定向到对应路由；
- auth(bool)：开启鉴权（未完善）；
- 在项目中引入 RouteView 组件，子路由需要 match、location 参数

## 全局状态

- 在 `./src/store/index.js` 的 initStore 中添加状态；
- 引入对应的 context 对象：`import { reduxContext } from "@/store"`；
- 在 `./src/store/index.js` 的 reducer 中配置处理逻辑；
- 调用 `useContext(reduxContext)` 获取全局状态与 dispatch；
- 使用 `dispatch(action)` 来更新全局状态；
- `action = { type: "UPDATE", value: key, [key]: <value> }`