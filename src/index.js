import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/icons.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
