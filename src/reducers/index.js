import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { publicationReducer } from "./PublicationReducer";

const reducers = combineReducers({ userReducer, publicationReducer });
export { reducers };
