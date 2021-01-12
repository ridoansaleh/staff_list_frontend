import { HashRouter, Switch, Route } from "react-router-dom";
import appRoutes from "./routes";

function App() {
  return (
    <HashRouter>
      <Switch>
        {appRoutes.map((data, index) => (
          <Route key={index} {...data} />
        ))}
      </Switch>
    </HashRouter>
  );
}

export default App;
