import React, { useState } from "react";
import { postUser } from "../redux/actions/actionsUser";
import { useDispatch } from "react-redux";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logoGithub from "../img/logo-github.png";
import logoGoogle from "../img/google-logo.png";
export default () => {
  let history = useHistory();
  var route;
  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    admin: false,
  });
  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name === "admin") {
      value = false;
    }
    if (name === "active") {
      value = true;
    }

    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const insertar = () => {
    dispatch(postUser(userSeleccionado));
    route = "/login/";
    history.push(`${route}`);
    window.location.reload(true);
  };

  return (
    <div className="container-signup">
      <from>
        <h1>Registrarse</h1>
        <br></br>
        <h3>Nombre</h3>
        <input
          className="campos"
          type="text"
          name="firstName"
          value={userSeleccionado ? userSeleccionado.firstName : ""}
          onChange={handleChange}
        />
        <br />
        <br />
        <h3>Apellido</h3>
        <input
          className="campos"
          type="text"
          name="lastName"
          value={userSeleccionado ? userSeleccionado.lastName : ""}
          onChange={handleChange}
        />
        <br />
        <br />
        <h3>Email</h3>
        <input
          className="campos"
          type="text"
          name="email"
          value={userSeleccionado ? userSeleccionado.email : ""}
          onChange={handleChange}
        />
        <br />
        <br />
        <h3>Password</h3>
        <input
          className="campos"
          type="password"
          name="password"
          value={userSeleccionado ? userSeleccionado.password : ""}
          onChange={handleChange}
        />
        <br />
        <br />
        <div className="sign-buttons">
          <div>
            <button className="button-cart2" onClick={() => insertar()}>
              Registrarse
            </button>
          </div>

          <Link to="/">
            <button className="button-cart">Cancelar</button>
          </Link>
          <Link to="http://localhost:3001/auth/github">
            <button className="button-social">
              <img src={logoGithub} height="25" width="25"></img>Ingresar con
              Github
            </button>
          </Link>
          <Link to="http://localhost:3001/auth/google">
            <button className="button-social icon-google">
              <img src={logoGoogle} height="25" width="25"></img>Ingresar con
              Google
            </button>
          </Link>
        </div>
      </from>
    </div>
  );
};
