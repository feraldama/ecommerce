import axios from "axios";

const url = "http://localhost:3001";

export const getProduct = () => (dispatch) => {
  axios.get(`${url}/products`).then((data) => {
    dispatch({
      type: "GET_PRODUCT",
      payload: data.data,
    });
  });
};

export const postProduct = (productSeleccionado, arrayCategoria) => (
  dispatch
) => {
  axios
    .post(`${url}/products`, {
      name: productSeleccionado.name,
      description: productSeleccionado.description,
      price: productSeleccionado.price,
      stock: productSeleccionado.stock,
      image: productSeleccionado.image,
      active: productSeleccionado.active,
      categories: arrayCategoria,
    })
    .then((data) => {
      dispatch({
        type: "POST_PRODUCT",
        payload: data.data,
      });
    });
};

export const putProduct = (productSeleccionado, arrayCategoria) => (dispatch) => {
  axios
    .put(`${url}/products/${productSeleccionado.id}`, {
      name: productSeleccionado.name,
      description: productSeleccionado.description,
      price: productSeleccionado.price,
      stock: productSeleccionado.stock,
      image: productSeleccionado.image,
      active: productSeleccionado.active,
      categories: arrayCategoria,
    })
    .then((data) => {
      dispatch({
        type: "PUT_PRODUCT",
        payload: data.data,
      });
    });
};

export const deleteProduct = (id) => (dispatch) => {
  axios.delete(`${url}/products/${id}`).then((data) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: data.data,
    });
  });
};
