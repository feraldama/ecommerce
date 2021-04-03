import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SignUp.css";
import './Review.css';

export default () => {
  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    name: "",
    description: "",
  });

  // const handleChange = (e) => {
  //   var { name, value } = e.target;
  //   Seleccionado((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const dispatch = useDispatch();
  const review = useSelector((state) => state.reducerReview.review);

  // const insertar = () => {
  //   dispatch(postReview(userSeleccionado));
  // };

  return (
    <form className="form">
      <label>Nombre</label>
      {/* <input className="form-control" type="text" value={name} /> */}
      <br />

      <div className="box-description">
        <a className="s1">
          <ion-icon name="star-outline"></ion-icon>
        </a>
        <a className="s2">
          <ion-icon name="star-outline"></ion-icon>
        </a>
        <a className="s3">
          <ion-icon name="star-outline"></ion-icon>
        </a>
        <a className="s4">
          <ion-icon  name="star-outline"></ion-icon>
        </a>
        <a className="s5">
          <ion-icon name="star-outline"></ion-icon>
        </a>
      </div>

      <label>Descripcion</label>
      <textarea
        className="form-control"
        type="text"
        placeholder="Escribe una reseña aqui"
        cols="0"
        rows="9"
        // value={description}
        // onChange={handleChange}
      />
      <br />

      <br />

      {/* <button className="btn btn-primary" onClick={() => insertar()}>
        Insertar
      </button>
      <button className="btn btn-danger">Cancelar</button> */}
    </form>
  );
};
