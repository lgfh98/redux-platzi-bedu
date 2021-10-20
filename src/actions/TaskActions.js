import {
  GET_ALL,
  LOADING,
  ERROR,
  CHANGE_SAVE_TASK_USER_ID,
  CHANGE_SAVE_TASK_TITLE,
  SAVE_TASK,
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
