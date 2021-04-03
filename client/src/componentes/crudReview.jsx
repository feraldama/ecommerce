import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  deleteReview,
  getReview,
  postReview,
  putReview,
} from "../redux/actions/actionsReview";
import { useSelector, useDispatch } from "react-redux";

const Prueba = () => {
  let { id } = useParams();

  // const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const login = useSelector((state) => state.reducerLogin.login);

  const [reviewSeleccionado, setReviewSeleccionado] = useState({
    id: "",
    review: "",
    calification: 0,
  });

  const seleccionarReview = (elemento, caso) => {
    setReviewSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    setReviewSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  var reviews = useSelector((state) => state.reducerReview.reviews);

  useEffect(() => {
    dispatch(getReview(id));
  }, []);

  const editar = () => {
    dispatch(putReview(reviewSeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    dispatch(deleteReview(reviewSeleccionado.productId,reviewSeleccionado.id,reviewSeleccionado.user.id));
    setModalEliminar(false);
  };

  const insertar = () => {
    dispatch(postReview(reviewSeleccionado,id,3));
    setModalInsertar(false);
  };

  const abrirModalInsertar = () => {
    setReviewSeleccionado(null);
    setModalInsertar(true);
  };

  var productName="";
  if(reviews){
    reviews.map((p) => {
      productName=p.product.name;
    });
  }

  return (
    <div className="App">
      <h2>Lista de Reviews: {productName}</h2>
      <br />
      <button className="btn btn-success" onClick={() => abrirModalInsertar()}>
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fecha Creación</th>
            <th>Usuario</th>
            <th>Review</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((elemento) => (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.createdAt}</td>
                <td>{elemento.user.firstName} {elemento.user.lastName}</td>
                <td>{elemento.review}</td>
                <td>{elemento.calification}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarReview(elemento, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarReview(elemento, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Review</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={reviewSeleccionado && reviewSeleccionado.id}
            />
            <br />

            <label>Review</label>
            <input
              className="form-control"
              type="text"
              name="review"
              value={reviewSeleccionado && reviewSeleccionado.review}
              onChange={handleChange}
            />
            <br />

            <label>Calification</label>
            <input
              className="form-control"
              type="text"
              name="calification"
              value={reviewSeleccionado && reviewSeleccionado.calification}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿ Estás Seguro que deseas eliminar el usuario{' "'}
          {reviewSeleccionado && reviewSeleccionado.review}
          {'" ?'}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Review</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Review</label>
            <input
              className="form-control"
              type="text"
              name="review"
              value={reviewSeleccionado ? reviewSeleccionado.review : ""}
              onChange={handleChange}
            />
            <br />

            <label>Calificación</label>
            <input
              className="form-control"
              type="text"
              name="calification"
              value={reviewSeleccionado ? reviewSeleccionado.calification : ""}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default Prueba;
