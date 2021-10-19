import { GET_ALL_BY_PUBLICATION, DEFAULT } from "./actionTypes/Comment";

import { LOADING_COMMENTS } from "./actionTypes/Publication";
import { deepCopy } from "../utils/deepCopy";

import axios from "axios";

const updateTargetPublication = (
  currentState,
  loadingComments,
  userId,
  publicationId,
  error
) => {
  const publicationsByUser =
    currentState.publicationReducer.publicationsByUser.map((e) => {
      return deepCopy(e);
    });

  const publicationTarget = publicationsByUser
    .find((e) => e.userId.toString() === userId.toString())
    .userPublications.find((e) => e.id.toString() === publicationId.toString());

  publicationTarget.loadingComments = loadingComments;
  if (error) publicationTarget.errorLoadingComments = error;

  return publicationsByUser;
};

const loadComments = async (
  dispatch,
  getState,
  userId,
  publicationId,
  reload
) => {
  dispatch({
    type: LOADING_COMMENTS,
    payload: updateTargetPublication(
      getState(),
      true,
      userId,
      publicationId,
      undefined
    ),
  });

  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${publicationId}`
    );

    dispatch({
      type: LOADING_COMMENTS,
      payload: updateTargetPublication(
        getState(),
        false,
        userId,
        publicationId,
        undefined
      ),
    });

    if (!reload) {
      dispatch({
        type: GET_ALL_BY_PUBLICATION,
        payload: [
          ...getState().commentReducer.comments,
          { publicationId, publicationComments: data },
        ],
      });
    } else {
      const { comments } = getState().commentReducer;

      const index = comments.findIndex((e) => {
        return e.publicationId.toString() === publicationId.toString();
      });

      const copyComments = comments.map((e) => deepCopy(e));

      if (index !== -1) {
        copyComments.splice(index, 1);
      }

      dispatch({
        type: GET_ALL_BY_PUBLICATION,
        payload: [
          ...copyComments,
          { publicationId, publicationComments: data },
        ],
      });
    }
  } catch (error) {
    dispatch({
      type: LOADING_COMMENTS,
      payload: updateTargetPublication(
        getState(),
        false,
        userId,
        publicationId,
        error.message
      ),
    });
  }
};

export const getByPublication =
  (publicationId, userId, reload) => async (dispatch, getState) => {
    const { comments } = getState().commentReducer;

    if (reload) {
      loadComments(dispatch, getState, userId, publicationId, true);
    }

    const alreadyExists = comments.find((e) => {
      return e.publicationId.toString() === publicationId.toString();
    });

    if (!alreadyExists) {
      loadComments(dispatch, getState, userId, publicationId);
    } else {
      dispatch({ type: DEFAULT });
    }
  };
