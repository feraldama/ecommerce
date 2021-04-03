import React, { useState, useEffect } from "react";
import axios from "axios";
import { postCart, putCart } from "../redux/actions/actionsCart";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Product.css";
import ShowReview from "./ShowReview.jsx";
import Swal from "sweetalert2";
export default function Product() {
  let { id } = useParams();
  var prodExiste;
  var quantity;
  const dispatch = useDispatch();
  const login = useSelector((state) => state.reducerLogin.login);
  const cart = useSelector((state) => state.reducerCart.cart);
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
      if (p.productId == id) {
        prodExiste = "S";
        quantity = p.quantity;
      }
    });
    if (prodExiste === "N") {
      if (Object.keys(login).length === 0) {
        var producto = {
          productId: id,
          product: {
            name: data.name,
            image: data.image,
            price: data.price,
          },
          userId: 1,
          subtotal: data.price,
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
  var url = "http://localhost:3001";
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((data) => setData(data.data));
    axios
      .get(`${url}/products/${id}/review/`)
      .then((review) => setReview(review.data));
  }, []);
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  return (
    <div className="container-prod">
      <div className="container-product">
        <div className="container-img">
          <img src={data.image} alt="Aqui va la imagen" />
        </div>
        <div className="container-data">
          <h1>{data.name}</h1>
          <h2>${data.price}</h2>
          <p>{data.description}.</p>
          <p>Stock {data.stock}</p>
          <div className="buttons-cart">
            <button className="button-cart2">Comprar Ahora</button>
            <button onClick={addProduct} className="button-cart">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <div className="separador"></div>

      <div className="container-review">
        <h1 className="title-review">RESEÑA SOBRE ESTE PRODUCTO</h1>
        <div className="form-group">
          <div className="form-group">
            {review.map((t) => (
              <ShowReview
                calification={t.calification}
                review={t.review}
                firstName={t.user.firstName}
                lastName={t.user.lastName}
                createdAt={t.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
