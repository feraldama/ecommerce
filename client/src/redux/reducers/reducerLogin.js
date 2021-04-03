const initialState = {
  login: {},
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_LOGIN":
      localStorage.setItem(
        "token",
        JSON.stringify(actions.payload.token).replace(/['"]+/g, "")
      );
      return {
        login: actions.payload,
      };

    case "POST_LOGOUT":
      localStorage.clear();
      return {
        login: {},
      };

    case "GET_LOGIN":
      return {
        login: actions.payload,
      };

    case "POST_API_LOGIN":
      if (Object.keys(actions.payload).length !== 0) {
        return {
          login: actions.payload.authData.user,
        };
      }

    default:
      return state;
  }
};
