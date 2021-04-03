import React, { useState, useEffect } from "react";
import { postLogin, getLogin } from "../redux/actions/actionLogin";
import { useSelector, useDispatch } from "react-redux";
import googleLogo from '../img/google-logo.png';
import logoGithub from '../img/logo-github.png'
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../redux/actions/actionLogin";
import "./Login.css";
import {
  Button,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";

export default () => {
  const [loginSeleccionado, setLoginSeleccionado] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.reducerLogin.login);

  useEffect(() => {
    dispatch(getLogin());
  }, [dispatch]);

  const handleChange = (e) => {
    var { name, value } = e.target;
    setLoginSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ingresar = () => {
    dispatch(postLogin(loginSeleccionado));
  };
  if (Object.keys(login).length === 0) {
    return (
      <div className="form-container">
        <form>
          <h1>Iniciar Sesión</h1>
          <br></br>

          <div>
            <h3>Email</h3>
            <input
              className="campos"
              type="text"
              name="email"
              value={loginSeleccionado ? loginSeleccionado.email : ""}
              onChange={handleChange}
              required
            />
            <br />
            <br></br>
            <br></br>
            <h3>Password</h3>
            <input
              className="campos"
              type="password"
              name="password"
              value={loginSeleccionado ? loginSeleccionado.password : ""}
              onChange={handleChange}
              required
            />
            <br />
            <br></br>
            <br></br>
          </div>
          <div className="form-buttons">
            <Link to={`/me`} onClick={() => ingresar()}>
              <button className="button-cart2">Ingresar</button>
            </Link>
            <Link to="/">
              <button className="button-cart">Cancelar</button>
            </Link>
            <Link to="/auth/github">
              <button className="button-social">
                <img src={logoGithub} height="25" width="25"></img>Ingresar con
                Github
              </button>
            </Link>
            <div>
              <button
                className="button-social icon-google"
                href="http://localhost:3001/auth/google"
              >
                <img src={googleLogo} height="25" width="25"></img>Ingresar con
                Google
              </button>
            </div>
          </div>
        </form>
        {/* <Typography variant="h3" color="primary"> */}
        {/* <Button
              variant="contained"
              color="link"
              href={"http://localhost:3000/auth/github"}
            >
              <FontAwesomeIcon icon={faGithubSquare} size="3x" />
              Ingresar con github
            </Button>
            <Button
              variant="contained"
              color="link"
              href={"http://localhost:3001/auth/google"}
            >
              <FontAwesomeIcon icon={faGooglePlusG} size="3x" />
              <span> Ingresar con google</span>
            </Button>
          </Typography> */}
      </div>
    );
  } else {
    let history = useHistory();
    var route = "/me";
    history.push(`${route}`);
  }
};
