import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      firstName: '',
      lastName: '',
      loginId: '',
      password: '',
      roleId: '',
      id: ''
    }
  }

  get() {
    let url = "https://manraj-ors-1.onrender.com/user";
    axios.get(url,{
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      // this.setState({ list: res.data.result.data })
      // console.error(res.data);
      this.setState({ list: res.data })
    }
    )
  }
  componentDidMount() {
    this.get();
  }
  delete(key) {
    let url = "https://manraj-ors-1.onrender.com/user/" + key;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      this.get();
      // console.error(this.state.list)
    })
  }
  render() {
    return (
      <div>
        <h1>LIST OF USERS</h1>
        <Table striped bordered hover >
          <thead>
            <tr >
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email id's</th>
              <th>Role id's</th>
              <th colSpan={2} >Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.loginId}</td>
                    <td>{item.roleId}</td>
                    <td> <Link to={"/adduser/" + item._id} ><button>Edit</button></Link></td>
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
