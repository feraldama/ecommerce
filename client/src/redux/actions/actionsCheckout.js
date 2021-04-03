import axios from "axios";

const url = "http://localhost:3001";

export const postCheckout = (checkoutSeleccionado,cart) => (dispatch) => {
  var userId = cart[0].userId
  axios
    .put(`${url}/orders/${userId}/checkout`, {withCredentials: true},{
      provincia: checkoutSeleccionado.provincia,
      localidad: checkoutSeleccionado.localidad,
      email: checkoutSeleccionado.email,
      direccion: checkoutSeleccionado.direccion,
      tarjeta: checkoutSeleccionado.tarjeta,
      numtarjeta: checkoutSeleccionado.numero,
      nombretitular: checkoutSeleccionado.email,
      vencimiento: checkoutSeleccionado.vencimiento,
      cvv: checkoutSeleccionado.cvv,
    })
    .then((data) => {
      dispatch({
        type: "POST_CHECKOUT",
        payload: data.data,
      });
    });
};