import { HashRouter, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users";
import Layout from "./Layout";
import { Publications } from "./Publications";

const Tasks = () => "Tareas";

const App = () => {
  return (
    <HashRouter>
      <Menu />
      <Layout>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/publications/:userId" component={Publications} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
