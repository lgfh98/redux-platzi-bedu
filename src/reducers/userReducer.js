const INITIAL_STATE = {
  users: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "traer_usuarios":
      return { state, users: action.payload };
    default:
      return state;
  }
};

export { userReducer };
