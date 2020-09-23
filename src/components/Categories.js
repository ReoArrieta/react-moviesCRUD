import React, { Component } from "react";
import axios from "axios";

export default class Categories extends Component {
  user = localStorage.getItem("user");

  state = { categories: [], id: 0, name: "", status_id: "", editting: false };

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
      const res = await axios.put("categories/" + this.state.id, this.state);
      this.state.editting = false;
      window.confirm(res.data.Message);
    } else {
      const res = await axios.post("categories/", this.state);
      window.confirm(res.data.Message);
    } 
    this.setState({ name: "", status_id: 0 });
    this.read();
  };

  read = async () => {
    const res = await axios.get("categories/");
    this.setState({ categories: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("categories/" + id);
    this.setState({
      id: res.data.Data.id,
      name: res.data.Data.name,
      status_id: res.data.Data.status_id,
      editting: true,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de eliminar la categoría?");
    if (res) {
      const res = await axios.delete("categories/" + id);
      window.confirm(res.data.Message);
      this.read();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h4 className="title">Agregar categoría</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onInputChange}
                  value={this.state.name}
                  autoFocus
                  required
                />
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
                  <td>#</td>
                  <td>Nombre</td>
                  <td>Estado</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.status}</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(category.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(category.id)}
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
