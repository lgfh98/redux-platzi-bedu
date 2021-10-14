import { GET_ALL_USERS } from "./actionNames";

export const getAllUsers = () => (dispatch) => {
  dispatch({
    type: GET_ALL_USERS,
    payload: [1, 2, 3],
  });
};
