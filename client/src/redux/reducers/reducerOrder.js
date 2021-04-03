const initialState = {
  orders: [],
  orderDetail: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_ORDER":
      return {
        orders: actions.payload,
      };

    case "GET_ORDER":
      return {
        orders: actions.payload,
      };

    default:
      return state;
  }
};
