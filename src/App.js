import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Movies from "./components/Movies";
import Categories from "./components/Categories";
import CategoryMovies from "./components/CategoryMovies";
import Rentals from "./components/Rentals";
import MovieRentals from './components/MovieRentals'
import Users from './components/Users'

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-3">
        <Route path="/" exact component={Movies} />
        <Route path="/categorias" exact component={Categories} />
        <Route path="/categorias/peliculas" exact component={CategoryMovies} />
        <Route path="/rentas" component={Rentals} />
        <Route path="/pelicula/rentas" component={MovieRentals} />
        <Route path="/usuarios" component={Users} />
        <Route path="/ingresar" component={Login} />
      </div>
    </Router>
  );
}

export default App;
