const initialState = {
  reviews: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_REVIEW":
      return {
        ...state,
        reviews: actions.payload,
      };

    case "DELETE_REVIEW":
      return {
        reviews: actions.payload,
      };

    case "POST_REVIEW":
      return {
        reviews: [...state.reviews, actions.payload],
      };

    case "PUT_REVIEW":
      var reviewLoaded = [];
      state.reviews.map((p) => {
        if (p.productId === actions.payload.productId) {
          p.review = actions.payload.review;
          p.calification = actions.payload.calification;
        }
        reviewLoaded.push(p);
      });
      return {
        reviews: reviewLoaded,
      };

    default:
      return state;
  }
};
