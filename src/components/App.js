import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users";
import Layout from "./Layout";

const Tasks = () => "Tareas";

const App = () => {
  return (
    <HashRouter>
      <Menu />
      <Layout>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/tasks" component={Tasks} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
