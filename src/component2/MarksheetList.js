import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class MarksheetList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    }
  }
   get() {
    const url = "https://manraj-ors-1.onrender.com/marksheet";
     axios.get(url,{
      headers : { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`}
     }).then((responce) => {
      this.setState({ list: responce.data })
    })
  }
  componentDidMount() {
    this.get()
  }
  delete(key){
    axios.delete("https://manraj-ors-1.onrender.com/marksheet/"+key, {
      headers : { Authorization : `Bearer ${JSON.parse(localStorage.getItem('auth'))}`}
    }).then((res)=>{
      console.log(res)
      this.get()
    })
  }
  render() {
    return (
      <div>
        <h3>MarksheetList</h3>
        <Table id='ta' striped bordered hover >
          <thead>
            <tr>
              <td>#</td>
              <td>Student name</td>
              <td>Student Id</td>
              <td>Roll number</td>
              <td>Physics</td>
              <td>Chemistry</td>
              <td>Maths</td>
              <td colSpan={2}>Operation</td>
            </tr>
          </thead>
          <tbody>
            {this.state.list &&
              this.state.list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td > {i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.studentId}</td>
                    <td>{item.rollNo}</td>
                    <td>{item.physics}</td>
                    <td>{item.chemistry}</td>
                    <td>{item.maths}</td>
                    <td><Link to={"/addmarksheet/" + item._id}  >Edit </Link></td>
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
