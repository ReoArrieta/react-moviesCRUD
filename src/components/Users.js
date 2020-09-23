import React, { Component } from "react";
import axios from "axios";

export default class Users extends Component {
  user = localStorage.getItem("user");

  state = {
    users: [],
    id: 0,
    name: "",
    email: "",
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
    if (this.state.id !== 0) {
      const res = await axios.put("users/" + this.state.id, this.state);
      window.confirm(res.data.Message);
      this.setState({ id: 0, name: "", email: "" });
      this.read();
    } else window.confirm("Elije un usuario para editar editar");
  };

  read = async () => {
    const res = await axios.get("users/");
    this.setState({ users: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("users/" + id);
    this.setState({
      id: id,
      name: res.data.Data.name,
      email: res.data.Data.email,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de eliminar usuario?");
    if (res) {
      const res = await axios.delete("users/" + id);
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
                <label>Correo</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.email}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Actualizar
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
                  <td>Correo</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(user.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(user.id)}
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
