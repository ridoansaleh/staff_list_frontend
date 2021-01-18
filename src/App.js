import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import appRoutes from "./routes";
import { LOGIN_PATH } from "./constant";

function CustomizedRoute(props) {
  const userToken = sessionStorage.getItem("user_token");
  if (props.auth === true && !userToken) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return <Route {...props} />;
}

function App() {
  return (
    <HashRouter>
      <Switch>
        {appRoutes.map((data, index) => (
          <CustomizedRoute key={index} {...data} />
        ))}
      </Switch>
    </HashRouter>
  );
}

export default App;
