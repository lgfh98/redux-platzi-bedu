import {
  GET_ALL,
  LOADING,
  ERROR,
  CHANGE_SAVE_TASK_USER_ID,
  CHANGE_SAVE_TASK_TITLE,
  CHANGE_COMPLETED_TASK,
  SAVE_TASK,
  CLEAN_STATE,
  SET_TASK_CHECK,
  DELETE_TASK,
} from "./actionTypes/Task";
import axios from "axios";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tasks = {};

    data.forEach((e) => {
      tasks[e.userId] = {
        ...tasks[e.userId],
        [e.id]: {
          ...e,
        },
      };
    });

    dispatch({
      type: GET_ALL,
      payload: tasks,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
};

export const changeSaveTaskUserId = (userId) => (dispatch) => {
  dispatch({
    type: CHANGE_SAVE_TASK_USER_ID,
    payload: userId,
  });
};

export const changeSaveTaskTitle = (taskTitle) => (dispatch) => {
  dispatch({
    type: CHANGE_SAVE_TASK_TITLE,
    payload: taskTitle,
  });
};

export const changeCompletedTask = (completed) => (dispatch) => {
  dispatch({
    type: CHANGE_COMPLETED_TASK,
    payload: completed,
  });
};

export const saveTask = (newTask) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    await axios.post("https://jsonplaceholder.typicode.com/todos", newTask);

    dispatch({
      type: SAVE_TASK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se pudo guardar la tarea",
    });
  }
};

export const editTask = (task) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${task.id}`,
      task
    );

    dispatch({
      type: SAVE_TASK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se pudo guardar la tarea",
    });
  }
};

export const cleanState = () => async (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  });
};

export const setTaskCheck =
  ({ userId, taskId }) =>
  async (dispatch, getState) => {
    const { tasks } = getState().taskReducer;
    const targetTask = tasks[userId][taskId];

    const updatedTasks = {
      ...tasks,
    };

    updatedTasks[userId] = {
      ...tasks[userId],
    };

    updatedTasks[userId][taskId] = {
      ...tasks[userId][taskId],
      completed: !targetTask.completed,
    };

    dispatch({
      type: SET_TASK_CHECK,
      payload: updatedTasks,
    });
  };

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${taskId}`
    );
    console.log({ response });
    dispatch({
      type: DELETE_TASK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Servicio no disponible",
    });
  }
};
