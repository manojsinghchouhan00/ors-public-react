
import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      "firstName": "",
      "lastName": "",
      "collegeId": "",
      "mobileNo": "",
      "email": "",
      "id": '',
      "find": ''
    }
  }
  get() {
    const url = "https://manraj-ors-1.onrender.com/student";
    axios.get(url, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((responce) => {
      // console.log(responce.data.result.data)
      this.setState({ list: responce.data })
    })
  }
  componentDidMount() {
    this.get();
  }
  delete(key) {
    const url = "https://manraj-ors-1.onrender.com/student/" + key;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((responce) => {
      // console.log(responce.data.result.data)
      this.get();
    })
  }
  search(key) {
    this.setState({ find: key })
    if (key) {
      axios.get("https://manraj-ors-1.onrender.com/student/search/" + key, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        this.setState({ list: res.data })
        // console.log(res.data)
      })
    } else {
      this.get();
    }
    // console.log("key", key.length)
  }
  render() {
    return (
      <div style={{ marginTop: '80px', textAlign: "center" }}>
        <h1>LIST OF STUDENT</h1>
        <hr />
        <form id="sign-in-form" className="text-left text-center">
          <span>
            <input type="text" name="name" placeholder='Search by key press' value={this.state.find}
              onChange={(e) => this.search(e.target.value)} />
          </span> &nbsp; &nbsp; &nbsp;
          <span>
            <input type="text" name="address" placeholder='Search by btn click'
              value={this.state.lastName} onChange={(event) => { this.setState({ lastName: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span className='bg-info'>
            <button type='button' onClick={() => this.search(this.state.lastName)}>Search</button>
          </span>
        </form>
        <hr />
        <Table striped bordered hover id='ta'>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>College id's</th>
              <th>Mobile Number</th>
              <th>Email id's</th>
              <th colSpan={2}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.length ?
              this.state.list.map((item, i) => {
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.collegeId}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.emailId}</td>
                    <td><Link to={"/addstudent/" + item._id} >Edit</Link></td>
                    <td><button type='button' onClick={() => this.delete(item._id)}>Delete</button></td>
                  </tr>
                )
              }) :
              <tr ><td style={{ textAlign: 'center', color: 'red' }}>DATA NOT FOUND</td></tr>
            }
          </tbody>


        </Table>
      </div>
    )
  }
}
