import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  user = localStorage.getItem("user");

  logout(){
    localStorage.clear();
    window.location.href="/ingresar"
  }

  render() {
    let buttons;
    if (this.user) {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Películas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categorias">
              Categorías
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categorias/peliculas">
              Categorías Películas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rentas">
              Rentas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pelicula/rentas">
              Película Rentas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/usuarios">
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/ingresar"
              onClick={() => this.logout()}
            >
              Cerrar sesión
            </Link>
          </li>
        </ul>
      );
    } else {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/ingresar">
              Iniciar sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registrarse">
              Resgistarse
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">Películas App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {buttons}
          </div>
        </div>
      </nav>
    );
  }
}
