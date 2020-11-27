import React from "react";
import { Route, Switch } from "react-router-dom";
import { getLocation, getMatch } from "./getRouterContext";
// 如何指定自定义配置文件？
// import rootRoutes from "./config"; // 默认配置文件
import rootRoutes from "@/config/router.config.js";
import routeRenderer from "./routeRenderer";

function RouteView() {
  const { state } = getLocation();
  const matchPath = getMatch().path;
  /** 获取当前路由对应路径 */
  const path = matchPath === "/" ? "" : `${matchPath}/`;
  /** 获取 rootRoutes(childrenRoutes) */
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
