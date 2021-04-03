import axios from "axios";

const url = "http://localhost:3001";

export const getReview = (id) => (dispatch) => {
  axios.get(`${url}/products/${id}/review/`).then((data) => {
    dispatch({
      type: "GET_REVIEW",
      payload: data.data,
    });
  });
};

export const postReview = (reviewSeleccionado,productId,userId) => (dispatch) => {
  axios
    .post(`${url}/products/${productId}/review`, {
      review: reviewSeleccionado.review,
      calification: reviewSeleccionado.calification,
      userId: userId,
    })
    .then((data) => {
      dispatch({
        type: "POST_REVIEW",
        payload: data.data,
      });
    });
};

export const putReview = (reviewSeleccionado) => (dispatch) => {
  axios
    .put(`${url}/products/${reviewSeleccionado.productId}/review/${reviewSeleccionado.id}`, {
      review: reviewSeleccionado.review,
      calification: reviewSeleccionado.calification,
      userId: reviewSeleccionado.userId,
    })
    .then((data) => {
      dispatch({
        type: "PUT_REVIEW",
        payload: data.data,
      });
    });
};

export const deleteReview = (productId, idReview, userId) => (
  dispatch,
  getState
) => {
  var state = getState();
  var newReview = state.reducerReview.reviews.filter(
    (item) => item.id !== idReview
  );
  axios
    .delete(`${url}/products/${productId}/review/${idReview}`, {
      userId: userId,
    })
    .then((data) => {
      dispatch({
        type: "DELETE_REVIEW",
        payload: newReview,
      });
    });
};
