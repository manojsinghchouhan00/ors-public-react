import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class RollList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      id: ''
    }
  }

  update() {
    axios.get("https://manraj-ors-1.onrender.com/role", {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      this.setState({ list: res.data })
    }
    )
  }
  componentDidMount() {
    this.update();
  }
  delete(key) {
    let url = "https://manraj-ors-1.onrender.com/role/" + key;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      this.update();
      // console.error(this.state.list)
    })
  }
  render() {
    return (
      <div>
        <h1>LIST OF ROLES</h1>
        <Table striped bordered hover >
          <thead>
            <tr >
              <th>#</th>
              <th>Roll id</th>
              <th>Name</th>
              <th>Discription</th>
              <th colSpan={2} >Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, i) => {
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.discription}</td>
                    <td> <Link to={"/addrole/" + item._id} ><button>Edit</button></Link></td>

                    <td><button type='button' onClick={() => this.delete(item._id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
