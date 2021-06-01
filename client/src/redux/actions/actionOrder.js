import axios from "axios";
const url = "http://localhost:3001";
export const getOrders = (id) => (dispatch) => {
  axios.get(`${url}/orders/${id}`, { withCredentials: true }).then((data) => {
    dispatch({
      type: "GET_ORDER",
      payload: data.data,
    });
  });
};
export const postOrder = (userId) => (dispatch) => {
  axios.post(`http://localhost:3001/orders/${userId}/checkout`).then((data) => {
    return data.data;
  });
};
export const postEmail = (checkout) => (dispatch) => {
  console.log("Checkout en actionOrder: ", checkout);
  axios
    .post(`http://localhost:3001/orders/send-email`, {
      checkout,
    })
    .then((data) => {
      return data.data;
    });
};
