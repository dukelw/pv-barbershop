import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Booking from "../pages/Booking";
import Workbench from "../pages/Workbench";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";

import MainLayout from "../layouts/MainLayout";

const publicRoutes = [
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.booking, component: Booking, layout: MainLayout },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.notFound, component: NotFound, layout: null },
  { path: config.routes.logout, component: Logout, layout: null },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.workbench,
    component: Workbench,
  },
  {
    type: "receptionist",
    path: config.routes.workbench,
    component: Workbench,
  },
  {
    type: "staff",
    path: config.routes.workbench,
    component: Workbench,
  },
];

export { publicRoutes, privateRoutes };
