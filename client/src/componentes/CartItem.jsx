import React, { useState, useEffect } from "react";
import { deleteCart, putCart } from "../redux/actions/actionsCart";
import { useSelector, useDispatch } from "react-redux";
import { getLogin } from "../redux/actions/actionLogin";
import "./CartItems.css";

export default function CartItem({
  productId,
  userId,
  quantity,
  subtotal,
  productName,
  productImage,
}) {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.reducerLogin.login);

  const cart = useSelector((state) => state.reducerCart.cart);

  useEffect(() => {
    dispatch(getLogin());
  }, [dispatch]);

  const borrarProducto = () => {
    if (Object.keys(login).length === 0) {
      eliminarCarritoLocalStorage(productId);
      dispatch(deleteCart(productId, 1));
    } else {
      dispatch(deleteCart(productId, login.id));
    }
  };

  // Elimina el carrito por el ID en Local Storage

  function eliminarCarritoLocalStorage(curso) {
    let carritoLS;
    // Obtenemos el arreglo de carrito
    carritoLS = obtenerCarritoLocalStorage();
    var carritoLSfiltrado = carritoLS.filter(
      (item) => item.productId !== curso
    );
    // Añadimos el arreglo actual a storage
    localStorage.setItem("carrito", JSON.stringify(carritoLSfiltrado));
  }

  //Comprueba que haya elementos en local storage
  function obtenerCarritoLocalStorage() {
    let carritoLS;
    //comprobamos si hay algo el local storage
    if (localStorage.getItem("carrito") === null) {
      carritoLS = [];
    } else {
      carritoLS = JSON.parse(localStorage.getItem("carrito"));
    }
    return carritoLS;
  }

  const quantityPlus = () => {
    if (Object.keys(login).length === 0) {
      var price;
      cart.map((p) => {
        if (p.productId == productId) {
          price = p.product.price;
        }
      });
      dispatch(putCart(productId, quantity + 1, 1, price));
    } else {
      dispatch(putCart(productId, quantity + 1, login.id));
    }
  };

  const quantityLess = () => {
    if (Object.keys(login).length === 0) {
      var price;
      cart.map((p) => {
        if (p.productId == productId) {
          price = p.product.price;
        }
      });
      dispatch(putCart(productId, quantity - 1, 1, price));
    } else {
      dispatch(putCart(productId, quantity - 1, login.id));
    }
  };

  return (
    <div>
      <div className="card-container">
        <div className="card-body">
          <h1 className="card-title">{productName}</h1>
        </div>
        <div className="card-body">
          <img src={productImage} heigh="90" width="90"></img>
        </div>
        <div className="card-items">
          <button alt="img" onClick={quantityPlus} className="button-item">
            +
          </button>
          <h4 className="card-title">Quantity: {quantity}</h4>
          <button onClick={quantityLess} className="button-item">
            -
          </button>
        </div>
        <h3 className='card-title'> Subtotal: ${subtotal}</h3>
        {/* <button onClick={borrarProducto} className='cart-button'>X</button> */}
      </div>
    </div>
  );
}
