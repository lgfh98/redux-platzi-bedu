import { GET_ALL, LOADING, ERROR } from "./actionTypes/User";
import { LOADING as LOADING_PUBLICATIONS } from "./actionTypes/Publication";
import axios from "axios";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  dispatch({
    type: LOADING_PUBLICATIONS,
  });
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de usuarios no disponible",
    });
  }
};
