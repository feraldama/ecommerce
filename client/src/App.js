import React from "react";
import { Route } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import Products from "./componentes/crudProducts.jsx";
import Product from "./componentes/Product.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import Searched from "./componentes/SearchedProducts.jsx";
import Categories from "./componentes/crudCategory.jsx";
import productCard from "./componentes/ProductCard.jsx";
import FilterCategories from "./componentes/FilterCategories.jsx";
import FilterProducts from './componentes/FilterProducts.jsx';
import Users from './componentes/crudUser.jsx';
import NavAdmin from "./componentes/NavAdmin.jsx";
import SignUp from "./componentes/SignUp";
import Order from "./componentes/Order";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './componentes/Login';
import Me from './componentes/Me.jsx';
import Review from "./componentes/Review.jsx";
import crudReview from './componentes/crudReview';
import Checkout from './componentes/Checkout';


function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/products" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/signup" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/login" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/me" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/checkout" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/admin" render={() => <NavAdmin onSearch="onSearch" />} />
      <Route exact path="/" component={FilterCategories} />
      <Route exact path="/" component={Catalogo} />
      <Route exact path="/admin/categories" component={Categories} />
      <Route exact path="/admin/products" component={Products} />
      <Route exact path="/admin/users" component={Users} />
      <Route exact path="/admin/products/:id/review" component={crudReview} />
      <Route path="/products/search/:id" component={Searched} />
      <Route exact path="/products/:id" component={Product} />
      <Route exact path="/productCard" component={productCard} />
      <Route path="/products/category/:id" component={FilterProducts} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/me" component={Me} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/admin/order/:id" component={Order} />
      <Route path="/review" component={Review} />
    </div>
  );
}

export default App;
