import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "./reducers";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  composeEnhancers(applyMiddleware(reduxThunk))
);
