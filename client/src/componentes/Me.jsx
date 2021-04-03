import React, { useState, useEffect } from "react";
import { getLogin } from "../redux/actions/actionLogin";
import { getOrders } from "../redux/actions/actionOrder";
import { getOrderDetail } from "../redux/actions/actionItems";
import { useSelector, useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { postReview } from "../redux/actions/actionsReview";
import { putUser } from "../redux/actions/actionsUser";
import { getCart, postCart } from "../redux/actions/actionsCart";
import { postLogin, postLogout } from "../redux/actions/actionLogin";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

export default () => {
  let history = useHistory();
  const [modalInsertar, setModalInsertar] = useState(false);

  const [reviewSeleccionado, setReviewSeleccionado] = useState({
    id: "",
    review: "",
    calification: 0,
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.reducerLogin.login);
  const products = useSelector((state) => state.reducerProduct.products);

  //***************************** */
  const users = useSelector((state) => state.reducerUser.users);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    admin: false,
  });

  const seleccionarUser = (elemento, caso) => {
    setUserSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChangeEditar = (e) => {
    var { name, value } = e.target;
    if ((name === "admin" || name === "active") && value === "true") {
      value = true;
    } else if ((name === "admin" || name === "active") && value === "false") {
      value = false;
    }
    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = async () => {
    dispatch(putUser(userSeleccionado));
    dispatch(postLogout());
    setUserSeleccionado([]);
    await Swal.fire("Usuario Editado! Por favor vuelva a ingresar.");
    var route = "/login";
    history.push(`${route}`);
    window.location.reload(true);
    // setModalEditar(false);
  };

  //***************************** */
  useEffect(() => {
    dispatch(getLogin());
  }, [dispatch]);

  const orders = useSelector((state) => state.reducerOrder.orders);
  const orderDetail = useSelector((state) => state.reducerProduct.products);

  useEffect(() => {
    if (Object.keys(login).length !== 0) {
      dispatch(getOrders(login.id));
    }
  }, [login]);

  useEffect(() => {
    if (Object.keys(login).length !== 0) {
      dispatch(getCart(login.id));
    }
  }, [login]);

  useEffect(() => {
    if (Object.keys(orders).length !== 0) {
      var orderItemVar;
      orderItemVar = orders.map((p) => {
        dispatch(getOrderDetail(p.id));
      });
    }
  }, [orders]);

  useEffect(() => {
    if (Object.keys(login).length !== 0) {
      let carritoLS;
      // Obtenemos el arreglo de carrito
      if (localStorage.getItem("carrito") === null) {
        carritoLS = [];
      } else {
        carritoLS = JSON.parse(localStorage.getItem("carrito"));
      }
      carritoLS.map((p) => {
        dispatch(postCart(p.productId, login.user.id));
      });
      localStorage.removeItem("carrito");
    }
  }, [login]);

  const handleChange = (e) => {
    var { name, value } = e.target;
    setReviewSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const abrirModalInsertar = (productId) => {
    setReviewSeleccionado({
      id: productId,
    });
    setModalInsertar(true);
  };

  const insertar = () => {
    dispatch(postReview(reviewSeleccionado, reviewSeleccionado.id, login.id));
    setModalInsertar(false);
  };

  var adminis;
  if (login.admin === true) {
    adminis = "Administrador";
  } else if (login.admin === false) {
    adminis = "Cliente";
  }

  return (
    <div>
      <h1>
        {Object.keys(login).length !== 0 ? (
          <div>
            {/* {login.user.id} - {login.user.firstName} - {login.user.lastName} -{" "}
            {login.user.email} - {adminis} */}
            {login.id} - {login.firstName} - {login.lastName} - {login.email} -{" "}
            {adminis}
            <br />
            <button
              className="btn btn-primary"
              onClick={() => seleccionarUser(login, "Editar")}
            >
              Editar Perfil
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              // onClick={() => seleccionarCategory(elemento, "Eliminar")}
            >
              Eliminar Perfil
            </button>
          </div>
        ) : (
          <div>Sin usuario logueado</div>
        )}
      </h1>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>ProductId</th>
          </tr>
        </thead>
        <tbody>
          {products.map((elemento) => (
            <tr>
              <td>
                <ul>
                  {elemento.order.map((order) => (
                    <div>
                      {order.id} {"   "}
                      {/* <button
                        className="btn btn-success"
                        onClick={() => abrirModalInsertar(category.productId)}
                      >
                        Insertar Review
                      </button> */}
                    </div>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {elemento.order.map((order) => (
                    <div>
                      {order.userId} {"   "}
                      {/* <button
                        className="btn btn-success"
                        onClick={() => abrirModalInsertar(category.productId)}
                      >
                        Insertar Review
                      </button> */}
                    </div>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {elemento.orderItems.map((order) => (
                    <div>
                      {order.productId} {" - "}
                      {order.product.name}
                      {"   "}
                      <button
                        className="btn btn-success"
                        onClick={() => abrirModalInsertar(order.productId)}
                      >
                        Insertar Review
                      </button>
                    </div>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Review</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product Id</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="productId"
              value={reviewSeleccionado.id}
              onChange={handleChange}
            />
            <br />

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

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
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
              value={userSeleccionado && userSeleccionado.id}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              value={userSeleccionado && userSeleccionado.firstName}
              onChange={handleChangeEditar}
            />
            <br />

            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={userSeleccionado && userSeleccionado.lastName}
              onChange={handleChangeEditar}
            />
            <br />
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado && userSeleccionado.email}
              onChange={handleChangeEditar}
            />
            <br />

            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={userSeleccionado && userSeleccionado.password}
              onChange={handleChangeEditar}
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
    </div>
  );
};
