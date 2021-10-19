import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { publicationReducer } from "./PublicationReducer";
import { commentReducer } from "./CommentReducer";

const reducers = combineReducers({
  userReducer,
  publicationReducer,
  commentReducer,
});
export { reducers };
