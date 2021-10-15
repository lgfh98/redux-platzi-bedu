import { GET_ALL, LOADING, ERROR, DEFAULT } from "./actionTypes/Publication";
import axios from "axios";

export const getByUser = (userId) => async (dispatch, getState) => {
  const { publications } = getState().publicationReducer;

  const search = publications.find((e) => {
    return e.userId.toString() === userId.toString();
  });

  if (!search) {
    dispatch({
      type: LOADING,
    });
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      const updatedPublications = [
        ...publications,
        { userId, publications: data },
      ];

      dispatch({
        type: GET_ALL,
        payload: updatedPublications,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "Algo salió mal, intenta más tarde.",
      });
    }
  } else {
    dispatch({ type: DEFAULT });
  }
};
