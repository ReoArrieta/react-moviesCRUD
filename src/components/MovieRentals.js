import React, { Component } from "react";
import axios from "axios";

export default class MovieRentals extends Component {
  user = localStorage.getItem("user");

  state = {
    movieRentals: [],
    movies: [],
    rentals: [],
    id: 0,
    movie_id: 0,
    rental_id: 0,
    price: "",
    observations: "",
    editting: false,
  };

  componentDidMount() {
    if (!this.user) window.location.href = "/ingresar";
    this.read();
    this.readMovies();
    this.readRentals();
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  readMovies = async () => {
    const res = await axios.get("movies/");
    this.setState({ movies: res.data.Data });
  };

  readRentals = async () => {
    const res = await axios.get("rentals/");
    this.setState({ rentals: res.data.Data });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editting) {
      const res = await axios.put("movie/rentals/" + this.state.id, this.state);
      window.confirm(res.data.Message);
      this.state.editting = false;
    } else {
      const res = await axios.post("movie/rentals/", this.state);
      window.confirm(res.data.Message);
    }
    this.read();
    this.setState({
      movie_id: 0,
      rental_id: 0,
      price: '',
      observations: "",
    });
  };

  read = async () => {
    const res = await axios.get("movie/rentals/");
    this.setState({ movieRentals: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("movie/rentals/" + id);
    this.setState({
      id: id,
      movie_id: res.data.Data.movie_id,
      rental_id: res.data.Data.rental_id,
      price: res.data.Data.price,
      observations: res.data.Data.observations,
      editting: true,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de eliminar la película renta?");
    if (res) {
      const res = await axios.delete("movie/rentals/" + id);
      window.confirm(res.data.Message);
      this.read();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h4 className="title">Agregar película renta</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Película</label>
                <select
                  name="movie_id"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.movie_id}
                  autoFocus
                  required
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
                <label>Renta</label>
                <select
                  name="rental_id"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.rental_id}
                  required
                >
                  <option></option>
                  {this.state.rentals.map((rental) => (
                    <option key={rental.id} value={rental.id}>
                      {rental.start_date}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.price}
                  required
                />
              </div>
              <div className="form-group">
                <label>Observaciones</label>
                <textarea
                  name="observations"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.observations}
                  required
                ></textarea>
              </div>
              <button className="btn btn-primary btn-block">
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
                  <th>#</th>
                  <th>Película</th>
                  <th>Renta</th>
                  <th>Precio</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.movieRentals.map((movieRental) => (
                  <tr key={movieRental.id}>
                    <td>{movieRental.id}</td>
                    <td>{movieRental.movie}</td>
                    <td>{movieRental.rental}</td>
                    <td>{movieRental.price}</td>
                    <td>{movieRental.observations}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(movieRental.id)}
                      >
                        ✏️
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(movieRental.id)}
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
