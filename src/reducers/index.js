import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { publicationReducer } from "./PublicationReducer";
import { commentReducer } from "./CommentReducer";
import { taskReducer } from "./TaskReducer";

const reducers = combineReducers({
  userReducer,
  publicationReducer,
  commentReducer,
  taskReducer,
});
export { reducers };
