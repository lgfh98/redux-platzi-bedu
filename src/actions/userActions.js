import { GET_ALL, LOADING, ERROR } from "./actionTypes/User";
import axios from "axios";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
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
