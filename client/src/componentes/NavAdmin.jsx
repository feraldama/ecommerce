import React from "react";
import Logo from "../img/logoHenry.png";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav({ onSearch }) {
  return (
    <nav className="nav-container">
      <Link to="/">
        <span className="navbar-brand">
          <img
            id="logoHenry"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          <h2>
            <strong>Odonto</strong> Henry
          </h2>
        </span>
      </Link>
      <Link to="/admin/products">
        <button class="button-cart2">Lista de Productos</button>
      </Link>
      <Link to="/admin/categories">
        <button class="button-cart2">Lista de Categorias</button>
      </Link>
      <Link to="/admin/users">
        <button class="button-cart2">Lista de Usuarios</button>
      </Link>
      <SearchBar handleChange={(e) => console.log(e.target.value)} />
    </nav>
  );
}

export default Nav;
