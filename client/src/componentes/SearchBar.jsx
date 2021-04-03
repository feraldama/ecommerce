import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();
  var route;
  const handleChange = (e) => {
    route = "/products/search/" + e.target.value;
  };

  const redirect = () => {
    if(!route) return null;
    history.push(`${route}`);
    window.location.reload(true);
  };

  return (
    <form class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Producto..."
        aria-label="Search"
        onChange={handleChange}
      />
      <button onClick={redirect} className='button-search'>
        Buscar
      </button>
    </form>
  );
};
