import {
  GET_ALL,
  LOADING,
  ERROR,
  DEFAULT,
  CHANGE_SAVE_TASK_TITLE,
  CHANGE_SAVE_TASK_USER_ID,
  SAVE_TASK,
} from "../actions/actionTypes/Task";

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: undefined,
  saveTask: {
    userId: "",
    taskTitle: "",
    successfulMessage: undefined,
    redirect: false,
  },
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        saveTask: {
          ...state.saveTask,
          redirect: false,
        },
      };
    case SAVE_TASK:
      return {
        ...state,
        tasks: {},
        loading: false,
        saveTask: {
          userId: "",
          taskTitle: "",
          successfulMessage: "La tarea ha sido guardada",
          redirect: true,
        },
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
        saveTask: {
          userId: "",
          taskTitle: "",
          successfulMessage: undefined,
        },
      };
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
