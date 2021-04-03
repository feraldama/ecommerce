import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { postCart, putCart } from "../redux/actions/actionsCart";
import { useSelector, useDispatch } from "react-redux";
import { getLogin } from "../redux/actions/actionLogin";
import Swal from "sweetalert2";
import './ProductCard.css';
export default function ProductCard({ id, name, price, image }) {
  var prodExiste;
  var quantity;
  const dispatch = useDispatch();
  const login = useSelector((state) => state.reducerLogin.login);
  const cart = useSelector((state) => state.reducerCart.cart);
  useEffect(() => {
    dispatch(getLogin());
  }, [dispatch]);
  //Almacena producto en el carrito al local storage
  function guardarCarritoLocalStorage(name) {
    let carrito;
    //Toma valor del local storage o vacío
    carrito = obtenerCarritoLocalStorage();
    //El producto seleccionado se agrega al arreglo
    carrito.push(name);
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
  const addProduct = () => {
    prodExiste = "N";
    cart.map((p) => {
      if (p.productId === id) {
        prodExiste = "S";
        quantity = p.quantity;
      }
    });
    if (prodExiste === "N") {
      if (Object.keys(login).length === 0) {
        var producto = {
          productId: id,
          product: {
            name,
            image,
            price,
          },
          userId: 1,
          subtotal: price,
          quantity: 1,
        };
        guardarCarritoLocalStorage(producto);
        dispatch(postCart(id, 1));
      } else {
        dispatch(postCart(id, login.id));
      }
    } else {
      quantityPlus();
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto Agregado!!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const quantityPlus = () => {
    if (Object.keys(login).length === 0) {
      var price;
      cart.map((p) => {
        if (p.productId == id) {
          price = p.product.price;
        }
      });
      dispatch(putCart(id, quantity + 1, 1, price));
    } else {
      dispatch(putCart(id, quantity + 1, login.id));
    }
  };

  return (
    <div className="container-card">
      <div className="container-card-img">
        <Link to={`/products/${id}`}>
          <img src={image} alt="Aqui va la imagen" width="200" height="200" />
        </Link>
      </div>
      <div className="container-card-body">
        <h2 className="card-title">{name}</h2>
        <h2 className="card-text">${price}</h2>
        <button onClick={addProduct} class="button-cart">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
