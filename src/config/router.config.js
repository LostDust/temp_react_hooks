import Home from "@@/Home";
import Other from "@@/Other";
import Child from "@@/Child";
import NotFound from "@@/NotFound";

/**
 * @type {route[]} routes
 * @property {string} route.path
 * @property {bool} route.exact
 * @property {string} route.redirect
 * @property {JSX.Element} route.component
 * @property {[routes]} route.children
 * @property {bool} route.auth
 */
const rootRoutes = [
  {
    path: "/",
    exact: true,
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/other",
    component: Other,
    children: [
      {
        path: "child",
        component: Child,
        auth: true,
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default rootRoutes;
