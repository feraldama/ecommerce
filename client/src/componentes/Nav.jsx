import React, { useState, useEffect } from "react";
import Logo from "../img/odonto-henry.png";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";
import { Link, useHistory } from "react-router-dom";
import carrito from "../img/cart-henry.png";
import Swal from "sweetalert2";
import usuario from "../icons/logo-usuario.png";
import { useSelector, useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import { emptyCart, getCart } from "../redux/actions/actionsCart";
import CartItem from "./CartItem";
import { Fragment } from "react";
import {
  postLogin,
  getLogin,
  postLogout,
  postApiLogin,
} from "../redux/actions/actionLogin";
import quantity from "./CartItem";
import axios from "axios";

function Nav() {
  let history = useHistory();
  let cantidad;

  const dispatch = useDispatch();

  const [loginSeleccionado, setLoginSeleccionado] = useState({
    email: "",
    password: "",
  });

  const cart = useSelector((state) => state.reducerCart.cart);

  const [modalInsertar, setModalInsertar] = useState(false);

  let { id } = useParams();

  const login = useSelector((state) => state.reducerLogin.login);

  useEffect(() => {
    dispatch(getLogin());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(login).length === 0) {
      dispatch(getCart(1));
    } else {
      dispatch(getCart(login.id));
    }
  }, [token]);

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const vaciarCarrito = () => {
    if (Object.keys(login).length === 0) {
      localStorage.clear();
      dispatch(emptyCart(1));
    } else {
      dispatch(emptyCart(login.id));
    }
    setModalInsertar(false)
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Se vacio el carrito !!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const comprar = () => {
    if (Object.keys(login).length === 0) {
      //dispatch(postOrder(1));
      var route = "/login";
      history.push(`${route}`);
    } else {
      var route = "/checkout";
      history.push(`${route}`);
    }
  };

  const logout = () => {
    dispatch(postLogout());
    setLoginSeleccionado([]);
    window.location.reload(true);
  };
  var token;
  token = localStorage.getItem("token", token);

  useEffect(() => {
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
  }, [token]);

  useEffect(() => {
    if (Object.keys(login).length !== 0) {
      dispatch(postLogin(loginSeleccionado));
    }
  }, [token]);

  //  if (Object.keys(cart).length === 0){
  //    cart.map((valor) =>{ console.log('VALOOOOOR: ', valor)})
  //    console.log(' Esta es la cantidad de productos: ', cantidad);
  //  }
  console.log("este es el cart :", cart);
  if (cart.length !== 0) {
    cantidad = 0;
    cart.map((p) => {
      cantidad += p.quantity;
      console.log("Esta es la cantidad: ", p.quantity);
    });
  }
  return (
    <nav className="nav-container">
      <div className="img-container">
        <div className="nolink">
          <Link to="/">
            <div>
              <img
                id="logoHenry"
                src={Logo}
                width="90"
                height="90"
                alt="Logo Henry"
              />
              <h1 className="titulo">
                <strong>Odonto</strong>HENRY
              </h1>
            </div>
          </Link>
        </div>{" "}
      </div>
      <div className="search-bar">
        <div className="dropdown">
          <img
            src={usuario}
            width="50"
            height="50"
            className="dropdown-img logos"
          ></img>
          <div className="dropdown-content">
            {Object.keys(login).length !== 0 ? (
              <Fragment>
                <Link to="/me">
                  <button className="btn btn-primary">Mi Perfil</button>
                </Link>
                <Link to="/" onClick={() => logout()}>
                  <button className="btn btn-danger">Logout</button>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/login">
                  <a>Iniciar Sesion</a>
                </Link>
                <Link to="/signup">
                  <a>Registrarse</a>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <Link onClick={() => abrirModalInsertar()}>
          <img
            id="carrito"
            src={carrito}
            width="50"
            height="50"
            className="logos"
          ></img>
        </Link>
        <span className="cart-number">{cantidad}</span>
        <SearchBar handleChange={(e) => console.log(e.target.value)} />
      </div>
      {/* MODAL DEL CARRITO */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
        </ModalHeader>
        <ModalBody>
          <div className="">
            <h1>Carrito</h1>
            {cart.map((t) => (
              <CartItem
                productId={t.productId}
                productName={t.product.name}
                productImage={t.product.image}
                userId={t.userId}
                quantity={t.quantity}
                subtotal={t.subtotal}
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
          {/* <Link to="/checkout" > */}
          <button className="btn btn-success" onClick={comprar}>
            Comprar
          </button>
          {/* </Link> */}
        </ModalFooter>
      </Modal>
    </nav>
  );
}

export default Nav;
