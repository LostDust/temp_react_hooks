import { Route, Switch, Redirect } from "react-router-dom";
import React, { useContext } from "react";

import { reduxContext } from "@/store.js";
import Home from "@/components/Home.jsx";
import Other from "@/components/Other.jsx";
import Child from "@/components/Child.jsx";

const rootRoutes = [
  {
    path: "/",
    exact: true,
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/other",
    component: Other,
    children: [
      {
        path: "child",
        component: Child,
        auth: true
      }
    ]
  }
];

function RouteView({ match, routes = rootRoutes }) {
  const { token } = useContext(reduxContext);
  const url = match ? `${match.url}/` : "";

  function routeRender(props, item) {
    if (item.redirect) return <Redirect to={item.redirect} />;
    // 鉴权
    if (item.auth && token != "hello") return <Redirect to="/home" />;
    props.routes = item.children;
    return <item.component {...props} />;
  }

  return (
    <Switch>
      {routes.map((item, key) => {
        return (
          <Route
            key={key}
            path={`${url}${item.path}`}
            exact={item.exact ? true : false}
            render={props => routeRender(props, item)}
          />
        );
      })}
    </Switch>
  );
}

export default RouteView;
