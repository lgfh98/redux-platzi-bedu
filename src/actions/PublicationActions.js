import {
  GET_ALL_BY_USER,
  LOADING,
  ERROR,
  DEFAULT,
} from "./actionTypes/Publication";
import axios from "axios";

export const getByUser = (userId) => async (dispatch, getState) => {
  const { publicationsByUser } = getState().publicationReducer;

  const alreadyExists = publicationsByUser.find((e) => {
    return e.userId.toString() === userId.toString();
  });

  if (!alreadyExists) {
    dispatch({
      type: LOADING,
    });
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      const userPublications = data.map((publication) => ({
        ...publication,
        loadingComments: false,
        errorLoadingComments: undefined,
      }));

      dispatch({
        type: GET_ALL_BY_USER,
        payload: [...publicationsByUser, { userId, userPublications }],
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "Publicaciones no disponibles",
      });
    }
  } else {
    dispatch({ type: DEFAULT });
  }
};
