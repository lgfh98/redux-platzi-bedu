import { GET_ALL, LOADING, ERROR, DEFAULT } from "../actions/actionTypes/User";

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
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export { userReducer };
