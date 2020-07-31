import React from "react";
import { Route, Switch } from "react-router-dom";
import { getLocation, getMatch } from "./getRouterContext";
import rootRoutes from "./config";
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
