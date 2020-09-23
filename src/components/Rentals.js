import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Rentals extends Component {
  user = JSON.parse(localStorage.getItem("user"));

  state = {
    rentals: [],
    id: 0,
    start_date: new Date(),
    end_date: "",
    total: 0,
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

  onSDateChange = (start_date) => {
    this.setState({ start_date });
  };

  onEDateChange = (end_date) => {
    this.setState({ end_date });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editting) {
      const res = await axios.put("rentals/" + this.state.id, this.state);
      window.confirm(res.data.Message);
      this.state.editting = false;
    } else {
      const res = await axios.post("rentals/", this.state);
      window.confirm(res.data.Message);
    }
    this.read();
    this.setState({
      start_date: new Date(),
      end_date: "",
      total: '',
      status_id: 0,
    });
  };

  read = async () => {
    const res = await axios.get("rentals/");
    this.setState({ rentals: res.data.Data });
  };

  update = async (id) => {
    const res = await axios.get("rentals/" + id);
    this.setState({
      id: id,
      start_date: new Date(res.data.Data.start_date),
      end_date: new Date(res.data.Data.end_date),
      total: res.data.Data.total,
      status_id: res.data.Data.status_id,
      editting: true,
    });
  };

  delete = async (id) => {
    const res = window.confirm("¿Estás seguro de elminar la renta?");
    if (res) {
      const res = await axios.delete("rentals/" + id);
      window.confirm(res.data.Message);
      this.read();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="card card-body">
            <h4 className="title">Agregar renta</h4>
            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label>Día inicio</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={this.state.start_date}
                  onChange={this.onSDateChange}
                  value={this.state.start_date}
                  required
                />
              </div>
              <div className="form-group">
                <label>Día fin</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={this.state.end_date}
                  onChange={this.onEDateChange}
                  value={this.state.end_date}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input
                  type="number"
                  className="form-control"
                  name="total"
                  onChange={this.onInputChange}
                  value={this.state.total}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estados</label>
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
              <button className="btn btn-primary btn-block">
                {this.state.editting ? "Actualizar" : "Guardar"}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card card-body">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <td>#</td>
                  <td>Fecha Inico</td>
                  <td>Fecha Fin</td>
                  <td>Total</td>
                  <td>Usuario</td>
                  <td>Estado</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {this.state.rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td>{rental.id}</td>
                    <td>{rental.start_date}</td>
                    <td>{rental.end_date}</td>
                    <td>{rental.total}</td>
                    <td>{rental.user}</td>
                    <td>{rental.status}</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.update(rental.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.delete(rental.id)}
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
