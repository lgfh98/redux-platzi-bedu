import {
  GET_ALL_BY_USER,
  LOADING,
  LOADING_COMMENTS,
  ERROR,
  DEFAULT,
} from "../actions/actionTypes/Publication";

const INITIAL_STATE = {
  publicationsByUser: [],
  loading: false,
  error: undefined,
};

const publicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_BY_USER:
      return {
        ...state,
        publicationsByUser: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        publicationsByUser: action.payload,
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
