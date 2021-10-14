import { GET_ALL } from "../actions/actionTypes/User";

const INITIAL_STATE = {
  users: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return { state, users: action.payload };
    default:
      return state;
  }
};

export { userReducer };
