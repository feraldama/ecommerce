const initialState = {
  // estado inicial
  products: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        products: actions.payload,
      };

    case "POST_PRODUCT":
      return {
        products: [...state.products, actions.payload],
      };

    case "PUT_PRODUCT":
      var productsLoaded = [];
      state.products.map((p) => {
        if (p.id === actions.payload.id) {
          p.name = actions.payload.name;
          p.description = actions.payload.description;
          p.price = actions.payload.price;
          p.stock = actions.payload.stock;
          p.image = actions.payload.image;
          p.active = actions.payload.active;
          p.categories = actions.payload.categories;
        }
        productsLoaded.push(p);
      });
      return {
        products: productsLoaded,
      };

    case "DELETE_PRODUCT":
      var productsLoaded = [];
      state.products.map((p) => {
        if (p.id === actions.payload.id) {
          p.active = actions.payload.active;
        }
        productsLoaded.push(p);
      });
      return {
        products: productsLoaded,
      };

    case "GET_ORDER_DETAIL":
      return {
        products: [...state.products,actions.payload],
      };

    default:
      return state;
  }
};
