import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import ProductCard from "./ProductCard.jsx";
export default () => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/products/actives")
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  return (
    <div className="container">
      {data
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
