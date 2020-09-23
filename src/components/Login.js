import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = { email: "", password: "" };
  user = localStorage.getItem('user');

  componentDidMount() {
    if (this.user) window.location.href = "/";
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("login/", this.state);
    if (res) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div>
        <div className="col-md-4 offset-md-4">
          <div className="card card-body">
            <h4 className="title">Iniciar sesión</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.email}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={this.state.password}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
