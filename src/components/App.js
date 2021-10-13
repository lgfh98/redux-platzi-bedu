import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users";

const Tasks = () => "Tareas";

const App = () => {
  return (
    <HashRouter>
      <Menu />
      <Switch>
        <div className="margen">
          <Route exact path="/" component={Users} />
          <Route exact path="/tasks" component={Tasks} />
        </div>
      </Switch>
    </HashRouter>
  );
};

export default App;
