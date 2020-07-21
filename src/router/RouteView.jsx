import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { reduxContext } from "@/store";
import rootRoutes from "@/router/config";

function RouteView(props) {
  // 获取当前路由对应路径
  const match = "match" in props ? props.match : { path: "/" };
  const url = match.path === "/" ? "" : `${match.path}/`;
  // 获取 rootRoutes(childrenRoutes)
  const location = "location" in props ? props.location : { state: null };
  const routes = location.state ? location.state.$routes : rootRoutes;
  // 获取全局状态
  const { token } = useContext(reduxContext);
  // 路由守卫
  function routeRender(props, item) {
    console.log(props.match.url);

    // 重定向
    if (item.redirect) return <Redirect to={item.redirect} />;
    // 鉴权
    if (item.auth && token !== "token") return <Redirect to="/other" />;
    // 将 childrenRoutes 存储到 location
    if (item.children)
      props.location.state = { ...props.location.state, $routes: item.children };

    return <item.component {...props} />;
  }

  return (
    <Switch>
      {routes.map((item, index) => {
        if (item.exact) {
          return (
            <Route
              exact
              key={index}
              path={`${url}${item.path}`}
              render={props => routeRender(props, item)}
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={`${url}${item.path}`}
              render={props => routeRender(props, item)}
            />
          );
        }
      })}
    </Switch>
  );
}

export default RouteView;
