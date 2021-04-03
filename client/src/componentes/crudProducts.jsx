import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../redux/actions/actionsProduct";
import {
  getReview,
} from "../redux/actions/actionsReview";
import { getCategory } from "../redux/actions/actionsCategory";

const Prueba = () => {
  let arrayCategoria = [];

  const dispatch = useDispatch();
  const products = useSelector((state) => state.reducerProduct.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const categories = useSelector((state) => state.reducerCategory.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  //const [categoria, setCategoria] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [productSeleccionado, setProductSeleccionado] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: "",
    active: false,
    categories: "",
  });

  const seleccionarProduct = (elemento, caso) => {
    setProductSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name === "active" && value === "true") {
      value = true;
    } else if (name === "active" && value === "false") {
      value = false;
    }
    setProductSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = () => {
    arrayCategoria.push(productSeleccionado.categories);
    dispatch(putProduct(productSeleccionado, arrayCategoria));
    setModalEditar(false);
  };


  const eliminar = () => {
    dispatch(deleteProduct(productSeleccionado.id));
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setProductSeleccionado(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    arrayCategoria.push(productSeleccionado.categories);
    dispatch(postProduct(productSeleccionado, arrayCategoria));
    setModalInsertar(false);
  };

  return (
    <div className="App">
      <h2>Lista de Productos</h2>
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
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {products.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.name}</td>
              <td>{elemento.description}</td>
              <td>{elemento.price}</td>
              <td>{elemento.stock}</td>
              <td>{elemento.image}</td>
              <td>
                <ul>
                  {elemento.categories.map((category) => (
                    <li>{category.name}</li>
                  ))}
                </ul>
              </td>
              <td>{elemento.active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarProduct(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarProduct(elemento, "Eliminar")}
                >
                  Eliminar
                </button>{" "}                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
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
              value={productSeleccionado && productSeleccionado.id}
            />
            <br />

            <label>Producto</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={productSeleccionado && productSeleccionado.name}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={productSeleccionado && productSeleccionado.description}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={productSeleccionado && productSeleccionado.price}
              onChange={handleChange}
            />
            <br />

            <label>Stock</label>
            <input
              className="form-control"
              type="text"
              name="stock"
              value={productSeleccionado && productSeleccionado.stock}
              onChange={handleChange}
            />
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={productSeleccionado && productSeleccionado.image}
              onChange={handleChange}
            />
            <br />

            <label>Categoria</label>
            <select name="categories" onChange={handleChange}>
              <option>Selecciona una categoría...</option>
              {categories.map((cat) => (
                <option type="checkbox" name="categories" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <br />

            <label>Activo</label>
            <select
              name="active"
              value={productSeleccionado && productSeleccionado.active}
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
          ¿ Estás Seguro que deseas eliminar el producto{' "'}
          {productSeleccionado && productSeleccionado.name}
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
            <h3>Insertar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Producto</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={productSeleccionado ? productSeleccionado.name : ""}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={productSeleccionado ? productSeleccionado.description : ""}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={productSeleccionado ? productSeleccionado.price : ""}
              onChange={handleChange}
            />
            <br />

            <label>Stock</label>
            <input
              className="form-control"
              type="text"
              name="stock"
              value={productSeleccionado ? productSeleccionado.stock : ""}
              onChange={handleChange}
            />
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={productSeleccionado ? productSeleccionado.image : ""}
              onChange={handleChange}
            />
            <br />

            <label>Categoria</label>
            <select
              name="categories"
              value={productSeleccionado ? productSeleccionado.categories : ""}
              onChange={handleChange}
            >
              <option>Selecciona una categoría...</option>
              {categories.map((cat) => (
                <option type="checkbox" name="categories" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <br />

            <label>Activo</label>
            <select
              name="active"
              value={productSeleccionado && productSeleccionado.active}
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
