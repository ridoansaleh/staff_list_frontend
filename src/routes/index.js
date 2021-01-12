import Login from "./login";
import Registration from "./registration";
import Dashboard from "./dashboard";
import Staff from "./staff";
import {
  LOGIN_PATH,
  REGISTRATION_PATH,
  DASHBOARD_PATH,
  STAFF_PATH,
} from "../constant";

const app_routes = [
  {
    exact: true,
    path: LOGIN_PATH,
    component: Login,
  },
  {
    path: REGISTRATION_PATH,
    component: Registration,
  },
  {
    path: DASHBOARD_PATH,
    component: Dashboard,
  },
  {
    path: STAFF_PATH,
    component: Staff,
  },
];

export default app_routes;
