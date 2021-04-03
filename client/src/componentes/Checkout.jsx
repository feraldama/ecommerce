import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { postEmail, postOrder } from "../redux/actions/actionOrder";
import { emptyCart } from "../redux/actions/actionsCart";
import './Checkout.css';
import Swal from "sweetalert2";
export default () => {
  let history = useHistory();
  var route;
  const login = useSelector((state) => state.reducerLogin.login);


  const handleChange = (e) => {
    var { name, value } = e.target;
    setCheckoutSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const checkout = async (e) => {
    console.log("checkoutSeleccionado en Checkout: ", checkoutSeleccionado);
    e.preventDefault();
    dispatch(postOrder(login.id));
    dispatch(postEmail(checkoutSeleccionado));
    await Swal.fire("Gracias por su compra!");
    var route = "/";
    console.log("Despues del mensaje");
    dispatch(emptyCart(login.id));

    history.push(`${route}`);
  };
  const [checkoutSeleccionado, setCheckoutSeleccionado] = useState({
    provincia: "",
    localidad: "",
    email: "",
    direccion: "",
    tarjeta: "",
    numtarjeta: "",
    nombretitular: "",
    vencimiento: "",
    cvv: "",
  });
  return (
    <form className="container-checkout" onSubmit={checkout}>
      <h2>Finaliza tu compra ingresando tus datos: </h2>
      <h3>Provincia</h3>
      <input
        className="campos"
        type="text"
        name="provincia"
        value={checkoutSeleccionado ? checkoutSeleccionado.provincia : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Localidad</h3>
      <input
        className="campos"
        type="text"
        name="localidad"
        value={checkoutSeleccionado ? checkoutSeleccionado.localidad : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Email</h3>
      <input
        className="campos"
        type="text"
        name="email"
        value={checkoutSeleccionado ? checkoutSeleccionado.email : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Direccion</h3>
      <input
        className="campos"
        type="text"
        name="direccion"
        value={checkoutSeleccionado ? checkoutSeleccionado.direccion : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Numero de Tarjeta</h3>
      <input
        className="campos"
        type="numero"
        name="tarjeta"
        value={checkoutSeleccionado ? checkoutSeleccionado.tarjeta : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Nombre Titular</h3>
      <input
        className="campos"
        type="text"
        name="nombre"
        value={checkoutSeleccionado ? checkoutSeleccionado.nombre : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>Vencimiento</h3>
      <label>Vencimiento</label>
      <input
        className="campos"
        type="date"
        name="vencimiento"
        value={checkoutSeleccionado ? checkoutSeleccionado.vencimiento : ""}
        onChange={handleChange}
        required
      />
      <br />
      <h3>CVV</h3>
      <label>CVV</label>
      <input
        className="campos"
        type="num"
        name="cvv"
        value={checkoutSeleccionado ? checkoutSeleccionado.cvv : ""}
        onChange={handleChange}
        required
      />
      <br />

      <br></br>
      <br></br>
      <div className='check-buttons'>
        <button type="submit" className="button-final">
          Finalizar Compra 👌
        </button>
        {"      "}
        <button className="button-final2">Cancelar</button>
      </div>
    </form>
  );
};
