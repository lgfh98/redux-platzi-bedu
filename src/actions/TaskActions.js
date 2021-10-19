import { GET_ALL, LOADING, ERROR } from "./actionTypes/Task";
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
