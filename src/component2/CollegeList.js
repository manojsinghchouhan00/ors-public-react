import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class CollegeList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      "address": "",
      "city": "",
      "name": "",
      "state": "",
      "phoneNo": "",
      "id": ''
    }
  }
  update() {
    const url = "https://manraj-ors-1.onrender.com/college";
    axios.get(url, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((responce) => {
      this.setState({ list: responce.data })
    })
  }
  componentDidMount() {
    this.update()
  }
  delete(key) {
    axios.delete("https://manraj-ors-1.onrender.com/college/" + key, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      console.log(res)
      this.update()
    })
  }
  render() {
    return (
      <div>
        <h1>LIST OF COLLEGES</h1>
        <Table id='ta' striped bordered hover >
          <thead>
            <tr>
              <td>#</td>
              <td>College Id's</td>
              <td>College Name</td>
              <td>Phone Number</td>
              <td>Address</td>
              <td>City</td>
              <td>State</td>
              <td colSpan={2}>Operation</td>
            </tr>
          </thead>
          <tbody>
            {this.state.list &&
              this.state.list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td > {i + 1}</td>
                    <td>{item._id}</td>
                    <td>{item.collegeName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td><Link to={"/addcollege/" + item._id}  >Edit </Link></td>
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


/* <Link 

to={{
  pathname: this.props.match.url + '/' + foo,
  search: '?foo=' + foo
}} /> */