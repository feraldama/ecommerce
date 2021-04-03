const initialState = {
  users: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_USER":
      return {
        users: [...state.users, actions.payload],
      };

    case "DELETE_USER":
      var userLoaded = [];
      state.users.map((p) => {
        if (p.id == actions.payload.id) {
          p.active = actions.payload.active;
        }
        userLoaded.push(p);
      });
      return {
        users: userLoaded,
      };

    case "GET_USER":
      return {
        ...state,
        users: actions.payload,
      };

    case "PUT_USER":
      var userLoaded = [];
      state.users.map((p) => {
        if (p.id == actions.payload.id) {
          p.firstName = actions.payload.firstName;
          p.lastName = actions.payload.lastName;
          p.password = actions.payload.password;
          p.email = actions.payload.email;
          p.admin = actions.payload.admin;
          p.active = actions.payload.active;
        }
        userLoaded.push(p);
      });
      return {
        users: userLoaded,
      };

    default:
      return state;
  }
};
