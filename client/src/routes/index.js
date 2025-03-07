import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

const publicRoutes = [
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.notFound, component: NotFound },
];

const privateRoutes = [
  // {
  //   type: "admin",
  //   path: config.routes.management,
  //   component: Management,
  // },
];

export { publicRoutes, privateRoutes };
