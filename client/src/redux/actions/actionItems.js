import axios from "axios";

const url = "http://localhost:3001";

export const getOrderDetail = (orderId) => (dispatch) => {
  axios.get(`${url}/orders/details/${orderId}`, {withCredentials: true}).then((data) => {
    dispatch({
      type: "GET_ORDER_DETAIL",
      payload: data.data,
    }); 
  }); 
};
