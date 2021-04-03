import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default () => {
  let { id } = useParams();
  var arrayProds = [];
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/category/${id}`)
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  if (data.products) arrayProds = data.products;
  return (
    <div className="container">
      {arrayProds
        .filter((p) => p.stock > 0)
        .map((t) => (
          <ProductCard
            id={t.id}
            name={t.name}
            price={t.price}
            image={t.image}
          />
        ))}
    </div>
  );
};
