import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from "../redux/actions/actionsUser";
import { useSelector, useDispatch } from "react-redux";

const Prueba = () => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

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

  const handleChange = (e) => {
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

  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducerUser.users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const editar = () => {
    dispatch(putUser(userSeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    dispatch(deleteUser(userSeleccionado.id));
    setModalEliminar(false);
  };

  const insertar = () => {
    dispatch(postUser(userSeleccionado));
    setModalInsertar(false);
  };

  const abrirModalInsertar = () => {
    setUserSeleccionado(null);
    setModalInsertar(true);
  };

  return (
    <div className="App">
      <h2>Lista de Usuarios</h2>
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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Password</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.firstName}</td>
              <td>{elemento.lastName}</td>
              <td>{elemento.password}</td>
              <td>{elemento.email}</td>
              <td>{elemento.admin ? "Administrador" : "Cliente"}</td>
              <td>{elemento.active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarUser(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarUser(elemento, "Eliminar")}
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
              onChange={handleChange}
            />
            <br />

            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={userSeleccionado && userSeleccionado.lastName}
              onChange={handleChange}
            />
            <br />
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado && userSeleccionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado && userSeleccionado.password}
              onChange={handleChange}
            />
            <br />

            <label>Administrador</label>
            <select
              name="admin"
              value={userSeleccionado && userSeleccionado.admin}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Administrador</option>
              <option value={new Boolean(0)}>Cliente</option>
            </select>
            <br />

            <label>Activo</label>
            <select
              name="active"
              value={userSeleccionado && userSeleccionado.active}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Activo</option>
              <option value={new Boolean(0)}>Inactivo</option>
            </select>
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
          {userSeleccionado && userSeleccionado.firstName}
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
            <h3>Insertar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              value={userSeleccionado ? userSeleccionado.firstName : ""}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={userSeleccionado ? userSeleccionado.lastName : ""}
              onChange={handleChange}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado ? userSeleccionado.email : ""}
              onChange={handleChange}
            />
            <br />

            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado ? userSeleccionado.password : ""}
              onChange={handleChange}
            />
            <br />

            <label>Administrador</label>
            <select
              name="admin"
              value={userSeleccionado && userSeleccionado.admin}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Administrador</option>
              <option value={new Boolean(0)}>Cliente</option>
            </select>

            <br />

            <label>Activo</label>
            <select
              name="active"
              value={userSeleccionado && userSeleccionado.active}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Activo</option>
              <option value={new Boolean(0)}>Inactivo</option>
            </select>

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
