import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import ProductCard from "./ProductCard.jsx";
import { useParams } from "react-router-dom";

export default () => {
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/search/${id}`)
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  if (data.length > 0) {
    return (
      <div className="container">
        {data.map((p) => (
          <ProductCard
            id={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Producto no encontrado "{id}"</h1>
      </div>
    );
  }
};
