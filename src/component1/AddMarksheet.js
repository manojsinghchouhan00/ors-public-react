import React from 'react'
import axios from 'axios';

export default class AddMarksheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollNo: '',
      name: '',
      physics: '',
      chemistry: '',
      maths: '',
      studentId: '',
      message: '',
      error: false
    }

    const params = window.location.pathname.split("/")[2]
    if (params) {
      this.get(params)
      console.log("params", params)
    }
  }
  get(id) {
    axios.get("https://manraj-ors-1.onrender.com/marksheet/" + id, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      this.setState({
        name: res.data.name,
        rollNo: res.data.rollNo,
        studentId: res.data.studentId,
        physics: res.data.physics,
        chemistry: res.data.chemistry,
        maths: res.data.maths,
      })
    })
  }
  submit() {
    const params = window.location.pathname.split("/")[2]
    // console.log(params)
    if (params) {
      const url = "https://manraj-ors-1.onrender.com/marksheet/" + params;
      axios.put(url, this.state, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        if (this.state.name || this.state.rollNo || this.state.studentId || this.state.physics || this.state.chemistry || this.state.maths || this.state.name != null) {
          this.setState({ message: res.data.result, error: true })
          if (res.data.acknowledged) {
            this.setState({ message: "Data updated successfully", error: true })
            console.log(res.data.modifiedCount)
          }
        } else {
          this.setState({ message: "Data save successfully" })
        }
      })
    } else {
      const url = "https://manraj-ors-1.onrender.com/marksheet";
      axios.post(url, this.state, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        if (res.data.result) {
          this.setState({ message: res.data.result, error: true })
        } else {
          this.setState({ message: "Data save successfully" })

        }
        console.log(res.data)
      })
    }

  }

  reset() {
    this.setState({
      rollNo: '',
      name: '',
      physics: '',
      chemistry: '',
      maths: '',
      studentId: '',
      error: false,
      message: ''
    })
  }
  render() {
    const params = window.location.pathname.split("/")[2]

    const mystyle = { color: "red" }
    return (
      <div>
        <h3 align='center' >{params ? "Edit marksheet" : "Add marksheet"}</h3>
        <div align="center" className='t1'>
          <p style={mystyle}>{this.state.message}</p>
          <table align='center'>
            <tbody className='tb1'>
              <tr>
                <td>
                  <input type="number" name='id' id='id' onChange={(e) => this.setState({ id: e.target.value })}
                    value={this.state.id} hidden />
                </td>
              </tr>

              <tr>
                <td> <label htmlFor="fname">Name</label> <br />
                  <input type="text" name='name' id='fname' onChange={(e) => this.setState({ name: e.target.value })}
                    value={this.state.name} required />
                </td>
                {this.state.error && !this.state.name && <td style={mystyle}>must not be empty</td>}
              </tr>

              <tr>
                <td> <label htmlFor="lname">Student id</label> <br />
                  <input type="number" name='student' id='lname' onChange={(e) => this.setState({ studentId: e.target.value })}
                    value={this.state.studentId} required />
                </td>
                {this.state.error && !this.state.studentId && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="log">Roll number</label> <br />
                  <input type="number" id='log' onChange={(e) => this.setState({ rollNo: e.target.value })}
                    value={this.state.rollNo} required />
                </td>
                {this.state.error && !this.state.rollNo && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="pass">Physics</label> <br />
                  <input type="number" name='physics' id='pass' onChange={(e) => this.setState({ physics: e.target.value })}
                    value={this.state.physics} required />
                </td>
                {this.state.error && !this.state.physics && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="pass">Mathemetics</label> <br />
                  <input type="number" name='math' id='pass' onChange={(e) => this.setState({ maths: e.target.value })}
                    value={this.state.maths} required />
                </td>
                {this.state.error && !this.state.maths && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="role">Chamistry</label> <br />
                  {/* <select name="" id="">
                <option value="Name">Click Name for role id<input type="text" id='role'  /></option>
              </select> */}
                  <input type="number" name='chemistry' id='role' onChange={(e) => this.setState({ chemistry: e.target.value })}
                    value={this.state.chemistry} required />
                </td>
                {this.state.error && !this.state.chemistry && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td>
                  <button className='btn btn-primary' onClick={() => this.submit()}> Submit</button>
                </td>
                <td>
                  <button className='btn btn-primary btn1' onClick={() => this.reset()}>Reset</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
