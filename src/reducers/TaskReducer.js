import { GET_ALL, LOADING, ERROR, DEFAULT } from "../actions/actionTypes/Task";

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: undefined,
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        tasks: action.payload,
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

export { taskReducer };
