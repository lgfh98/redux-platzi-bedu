import { GET_ALL, LOADING, ERROR } from "../actions/actionTypes/User";

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true, error: undefined };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { userReducer };
