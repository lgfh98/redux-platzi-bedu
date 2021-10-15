import { GET_ALL, LOADING, ERROR } from "./actionTypes/Publication";
import axios from "axios";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Algo salió mal, intenta más tarde.",
    });
  }
};

export const getByUser = (key) => async (dispatch, getState) => {
  const { users } = getState().userReducer;
  const userId = users[key].id;

  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Algo salió mal, intenta más tarde.",
    });
  }
};
