import { GET_ALL } from "./actionTypes/User";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
