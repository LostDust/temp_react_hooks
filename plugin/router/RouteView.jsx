import React from "react";
import { Route, Switch } from "react-router-dom";
// 通过 react 内部 ContextAPI 获取状态
import { getLocation, getMatch } from "./getRouterContext";
/** 未来优化：如何指定自定义配置文件？ */
// import rootRoutes from "./config"; // plugin 目录下的配置文件
import rootRoutes from "@/config/router.config.js"; // src 目录下的配置文件
// 路由守卫
import routeRenderer from "./routeRenderer";

function RouteView() {
  const { state } = getLocation();
  const matchPath = getMatch().path;
  // 获取当前路由对应路径
  const path = matchPath === "/" ? "" : `${matchPath}/`;
  // get rootRoutes or childrenRoutes
  const routes = state ? state.$routes : rootRoutes;

  return (
    <Switch>
      {routes.map((item, index) => {
        if (item.exact) {
          return (
            <Route
              exact
              key={index}
              path={`${path}${item.path}`}
              render={props => routeRenderer(props, item)}
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={`${path}${item.path}`}
              render={props => routeRenderer(props, item)}
            />
          );
        }
      })}
    </Switch>
  );
}

// context update 时依旧会更新
export default React.memo(RouteView);
