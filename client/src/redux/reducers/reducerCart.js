const initialState = {
  cart: [],
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_CART":
      return {
        cart: [...state.cart, actions.payload],
      };
    case "DELETE_CART":
      return {
        cart: actions.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: actions.payload,
      };
    case "PUT_CART":
      var userId;
      actions.payload.map((p) => {
        userId = p.userId;
      });
      var cartLoaded = [];
      if (userId !== 1) {
        state.cart.map((p) => {
          actions.payload.map((q) => {
            if (p.productId == q.productId) {
              p.quantity = q.quantity;
              p.subtotal = q.subtotal;
            }
            cartLoaded.push(p);
          });
        });
        return {
          cart: cartLoaded,
        };
      } else {
        return {
          cart: actions.payload,
        };
      }
    case "EMPTY_CART":
      return {
        cart: [],
      };
    default:
      return state;
  }
};
