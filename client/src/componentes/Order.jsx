import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default () => {
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/cart/${id}`).then((data) => {
      setData(data.data);
    });
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <h2>Tu carrito de Compras</h2>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </thead>
        <tbody>
          {data.map((elemento) => (
            <tr>
              <td>{elemento.product.name}</td>
              <td>{elemento.product.price}</td>
              <td>{elemento.quantity}</td>
              <td>{elemento.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
