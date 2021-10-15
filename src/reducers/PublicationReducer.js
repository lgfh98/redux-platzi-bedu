import {
  GET_ALL,
  LOADING,
  ERROR,
  DEFAULT,
} from "../actions/actionTypes/Publication";

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: undefined,
};

const publicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        publications: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export { publicationReducer };
