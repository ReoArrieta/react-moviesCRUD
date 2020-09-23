import React, { Component } from "react";
import axios from "axios";

export default class CatgoryMovies extends Component {
  user = localStorage.getItem("user");

  state = {
    movies: [],
    categories: [],
    categoryMovies: [],
    id: 0,
    movie_id: 0,
    category_id: 0,
    editting: false,
  };

  componentDidMount() {
    if (!this.user) window.location.href = "/ingresar";
    this.read();
    this.readMovies();
    this.readCategories();
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  readMovies = async () => {
    const res = await axios.get("movies/");
    this.setState({ movies: res.data.Data });
  };

  readCategories = async () => {
    const res = await axios.get("categories/");
    this.setState({ categories: res.data.Data });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editting) {
      const res = await axios.put('category/movies/' + this.state.id, this.state);
      window.confirm(res.data.Message);
      this.state.editting = false;
    }else {
      const res = await axios.post("category/movies/", this.state);
      window.confirm(res.data.Message);
    }
    this.read();
    this.setState({ movie_id: 0, category_id: 0 });
  };

  read = async () => {
    const res = await axios.get("category/movies/");
    this.setState({ categoryMovies: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("category/movies/" + id);
    this.setState({
      id: id,
      movie_id: res.data.Data.movie_id,
      category_id: res.data.Data.category_id,
      editting: true,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de eliminar la categoría de película?");
    if (res) {
      const res = await axios.delete("category/movies/" + id);
      window.confirm(res.data.Message);
      this.read();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h4 className="title">Agregar categoría película</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Película</label>
                <select
                  name="movie_id"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.movie_id}
                >
                  <option></option>
                  {this.state.movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  name="category_id"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.category_id}
                >
                  <option></option>
                  {this.state.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {this.state.editting ? "Actualizar" : "Guardar"}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card card-body">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <td>#</td>
                  <td>Películas</td>
                  <td>Categorías</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {this.state.categoryMovies.map((categoryMovie) => (
                  <tr key={categoryMovie.id}>
                    <td>{categoryMovie.id}</td>
                    <td>{categoryMovie.movie}</td>
                    <td>{categoryMovie.category}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(categoryMovie.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(categoryMovie.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
