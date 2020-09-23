import React, { Component } from "react";
import axios from "axios";

export default class Movies extends Component {
  user = JSON.parse(localStorage.getItem("user"));

  state = {
    movies: [],
    id: 0,
    name: "",
    description: "",
    user_id: this.user?.id,
    status_id: 0,
    editting: false,
  };

  componentDidMount() {
    if (!this.user) window.location.href = "/ingresar";
    this.read();
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editting) {
      const res = await axios.put("movies/" + this.state.id, this.state);
      window.confirm(res.data.Message);
      this.state.editting = false;
    } else {
      const res = await axios.post("movies/", this.state);
      window.confirm(res.data.Message);
    }
    this.read();
    this.setState({ name: "", description: "", status_id: 0 });
  };

  read = async () => {
    const res = await axios.get("movies/");
    this.setState({ movies: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("movies/" + id);
    this.setState({
      id: id,
      name: res.data.Data.name,
      description: res.data.Data.description,
      status_id: res.data.Data.status_id,
      editting: true,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de eliminar la película?");
    if (res) {
      const res = await axios.delete("movies/" + id);
      window.confirm(res.data.Message);
      this.read();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h4 className="title">Agregar película</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.name}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={this.onInputChange}
                  value={this.state.description}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  name="status_id"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.status_id}
                  required
                >
                  <option></option>
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
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
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.name}</td>
                    <td>{movie.description}</td>
                    <td>{movie.user}</td>
                    <td>{movie.status}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(movie.id)}
                      >
                        ✏️
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(movie.id)}
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
