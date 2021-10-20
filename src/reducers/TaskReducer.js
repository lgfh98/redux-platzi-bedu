import {
  GET_ALL,
  LOADING,
  ERROR,
  DEFAULT,
  CHANGE_SAVE_TASK_TITLE,
  CHANGE_SAVE_TASK_USER_ID,
} from "../actions/actionTypes/Task";

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: undefined,
  saveTask: {
    userId: undefined,
    taskTitle: undefined,
  },
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
    case CHANGE_SAVE_TASK_USER_ID:
      return {
        ...state,
        saveTask: { ...state.saveTask, userId: action.payload },
      };
    case CHANGE_SAVE_TASK_TITLE:
      return {
        ...state,
        saveTask: { ...state.saveTask, taskTitle: action.payload },
      };
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export { taskReducer };
