import axios from "axios";
const url = "http://localhost:3001";
export const getCart = (id) => (dispatch) => {
  if (id === 1) {
    let carritoLS;
    //comprobamos si hay algo el local storage
    if (localStorage.getItem("carrito") === null) {
      carritoLS = [];
    } else {
      carritoLS = JSON.parse(localStorage.getItem("carrito"));
    }
    dispatch({
      type: "GET_CART",
      payload: carritoLS,
    });
  } else {
    axios.get(`${url}/cart/${id}`, { withCredentials: true }).then((data) => {
      dispatch({
        type: "GET_CART",
        payload: data.data,
      });
    });
  }
};
export const postCart = (product, userId) => (dispatch) => {
  if (userId === 1) {
    let carritoLS;
    // Obtenemos el arreglo de carrito
    if (localStorage.getItem("carrito") === null) {
      carritoLS = [];
    } else {
      carritoLS = JSON.parse(localStorage.getItem("carrito"));
    }
    dispatch({
      type: "POST_CART",
      payload: carritoLS[carritoLS.length - 1],
    });
  } else {
    axios
      .post(`http://localhost:3001/cart/${userId}/add`, {
        quantity: 1,
        productId: product,
      })
      .then((data) => {
        dispatch({
          type: "POST_CART",
          payload: data.data,
        });
      });
  }
};
export const putCart = (productId, quantity, userId, subtotal) => (
  dispatch
) => {
  if (userId === 1) {
    let carritoLS;
    // Obtenemos el arreglo de carrito
    if (localStorage.getItem("carrito") === null) {
      carritoLS = [];
    } else {
      carritoLS = JSON.parse(localStorage.getItem("carrito"));
    }
    var carritoLSfiltrado = [];
    carritoLS.map((p) => {
      if (p.productId === productId) {
        p.quantity = quantity;
        p.subtotal = subtotal * quantity;
      }
      carritoLSfiltrado.push(p);
    });
    localStorage.setItem("carrito", JSON.stringify(carritoLSfiltrado));
    console.log(
      "actionCart SIN usuario carritoLSfiltrado: ",
      carritoLSfiltrado
    );
    dispatch({
      type: "PUT_CART",
      payload: carritoLSfiltrado,
    });
  } else {
    console.log("actionCart CON usuario: ", userId);
    axios
      .put(`${url}/cart/${userId}`, {
        productId: productId,
        quantity: quantity,
      })
      .then((data) => {
        dispatch({
          type: "PUT_CART",
          payload: [data.data],
        });
      });
  }
};
export const deleteCart = (productId, userId) => (dispatch, getState) => {
  if (userId === 1) {
    let carritoLS;
    // Obtenemos el arreglo de carrito
    if (localStorage.getItem("carrito") === null) {
      carritoLS = [];
    } else {
      carritoLS = JSON.parse(localStorage.getItem("carrito"));
    }
    var carritoLSfiltrado = carritoLS.filter(
      (item) => item.productId !== productId
    );
    dispatch({
      type: "DELETE_CART",
      payload: carritoLSfiltrado,
    });
  } else {
    var state = getState();
    var newCart = state.reducerCart.cart.filter(
      (item) => item.productId !== productId
    );
    axios.delete(`${url}/cart/${userId}/remove/${productId}`).then(() => {
      dispatch({
        type: "DELETE_CART",
        payload: newCart,
      });
    });
  }
};
export const emptyCart = (userId) => (dispatch) => {
  if (userId === 1) {
    dispatch({
      type: "EMPTY_CART",
    });
  } else {
    axios.delete(`${url}/cart/${userId}/empty`).then(() => {
      dispatch({
        type: "EMPTY_CART",
      });
    });
  }
};
