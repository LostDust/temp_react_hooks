# Router 插件

- 功能：路由规则集中配置；
- 依赖：`react-router-dom`；

## 开始

- 在 `@/config/router.config.js` 或 `#/router/config.js` 集中配置路由规则；
- 前者为默认配置文件路径，可以在 `#/router/routeView.jsx` 中修改；
- 在项目中导入：`import { RouteView } from "#/router"`；
- 直接用 RouteView  组件代替若干 Route 组件；
- 使用以下 API 能够访问路由的 Context，而不会订阅更新。若希望订阅更新请使用官方的 HooksAPI；
- `import { getRouterContext, getLocation, getHistory, getMatch, getParams } from "#/router"`；

## 配置

- path(string)：路由对应的路径，children 下的 path 会与父级拼接；
- component(JSX_Element)：路由对应的组件；
- children([routes])：路由嵌套时的子路由规则；
- exact(bool)：严格匹配路径；
- redirect(JSX_Element)：重定向到对应路由；
- auth(bool)：开启鉴权（未完善）；

## 注意

- 该模块在使用时占用了 location.state 的 $routes 字段；