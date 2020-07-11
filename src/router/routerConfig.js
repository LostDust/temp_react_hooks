import Home from "@@/Home";
import Other from "@@/Other";
import Child from "@@/Child";
import NotFound from "@@/NotFound";

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
