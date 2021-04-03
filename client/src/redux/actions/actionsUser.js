import axios from "axios";

const url = "http://localhost:3001";

export const getUser = () => (dispatch) => {
  axios.get(`${url}/users`).then((data) => {
    dispatch({
      type: "GET_USER",
      payload: data.data,
    });
  });
};

export const postUser = (userSeleccionado) => (dispatch) => {
  axios
    .post(`${url}/users`, {
      firstName: userSeleccionado.firstName,
      lastName: userSeleccionado.lastName,
      password: userSeleccionado.password,
      email: userSeleccionado.email,
      admin: userSeleccionado.admin,
      active: userSeleccionado.active,
    })
    .then((data) => {
      dispatch({
        type: "POST_USER",
        payload: data.data,
      });
    });
};

export const putUser = (userSeleccionado) => (dispatch) => {
  axios
    .put(`${url}/users/${userSeleccionado.id}`, {
      firstName: userSeleccionado.firstName,
      lastName: userSeleccionado.lastName,
      password: userSeleccionado.password,
      email: userSeleccionado.email,
      admin: userSeleccionado.admin,
      active: userSeleccionado.active,
    })
    .then((data) => {
      dispatch({
        type: "PUT_USER",
        payload: data.data,
      });
    });
};

export const deleteUser = (id) => (dispatch) => {
  axios.delete(`${url}/users/${id}`).then((data) => {
    dispatch({
      type: "DELETE_USER",
      payload: data.data,
    });
  });
};
