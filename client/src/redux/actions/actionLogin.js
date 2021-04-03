import axios from "axios";

const url = "http://localhost:3001";

export const getLogin = () => (dispatch) => {
  axios.get(`${url}/auth/me`,{withCredentials: true}).then((data) => {
    dispatch({
      type: "GET_LOGIN",
      payload: data.data,
    });
  });
};

export const postLogin = (loginSeleccionado) => (dispatch) => {
  axios
    .post(`${url}/auth/login`, {
      username: loginSeleccionado.email,
      password: loginSeleccionado.password,
    })
    .then((data) => {
      dispatch({
        type: "POST_LOGIN",
        payload: data.data,
      });
    });
};

export const postLogout = () => (dispatch) => {
  localStorage.clear();
  axios.post(`${url}/auth/logout`).then((data) => {
    dispatch({
      type: "POST_LOGOUT",
      payload: data.data,
    });
  });
};

export const postApiLogin = (token) => (dispatch) => {
  const body = {};
  axios
  .post(`http://localhost:3001/auth/api/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((data) => {
    dispatch({
      type: "POST_API_LOGIN",
      payload: data.data,
    });
  });
};
