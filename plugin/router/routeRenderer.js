import React from "react";
import { Redirect } from "react-router-dom";
import { getModel } from "#/provider";

/** 路由守卫 */
function routeRenderer(props, route) {
  /** 重定向 */
  if (route.redirect) return <Redirect to={route.redirect} />;
  /** 鉴权 */
  if (route.auth) {
    /** 获取全局状态（待完善） */
    const { token } = getModel("auth");
    if (token !== "token") return <Redirect to="/other" />;
  }
  /** 将 childrenRoutes 存储到 location */
  if (route.children)
    props.location.state = {
      ...props.location.state,
      $routes: route.children,
    };

  return <route.component {...props} />;
}

export default routeRenderer;
