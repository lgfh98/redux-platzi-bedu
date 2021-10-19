import {
  GET_ALL_BY_PUBLICATION,
  DEFAULT,
} from "../actions/actionTypes/Comment";

const INITIAL_STATE = {
  comments: [],
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_BY_PUBLICATION:
      return {
        ...state,
        comments: action.payload,
      };
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export { commentReducer };
