import { GET_ALL, LOADING, ERROR, DEFAULT } from "./actionTypes/Publication";
import axios from "axios";

export const getByUser = (key) => async (dispatch, getState) => {
  const { users } = getState().userReducer;
  const { publications } = getState().publicationReducer;
  const userId = users[key].id;

  let updatedPublications = [];
  const search = publications.find(
    (userPublications) => userPublications[0].userId === userId
  );

  if (!search) {
    dispatch({
      type: LOADING,
    });
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      updatedPublications = [...publications, data];

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
