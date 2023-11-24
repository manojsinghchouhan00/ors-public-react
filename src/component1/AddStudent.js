import React from 'react'
import axios from 'axios';

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      collegeId: '',
      mobileNo: '',
      emailId: '',
      error: false,
      message: ''
    }
    const params = window.location.pathname.split("/")[2]
    if (params) {
      this.get(params)
    }
  }
  get(id) {
    axios.get("https://manraj-ors-1.onrender.com/student/" + id, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        collegeId: res.data.collegeId,
        mobileNo: res.data.mobileNo,
        emailId: res.data.emailId,
      })
    })
  }
  submit() {
    const params = window.location.pathname.split("/")[2]
    // console.log(params)
    if (params) {
      const url = "https://manraj-ors-1.onrender.com/student/" + params;
      axios.put(url, this.state, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        if (res.data.result) {
          this.setState({ message: res.data.result, error: true })
        } else {
          this.setState({ message: "Data save successfully" })

        }
        console.log(res.data)
      })
    } else {
      const url = "https://manraj-ors-1.onrender.com/student";
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
      firstName: '',
      lastName: '',
      collegeId: '',
      mobileNo: '',
      emailId: '',
      error: false,
      message: ''
    })
  }
  render() {
    const params = window.location.pathname.split("/")[2]

    const mystyle = { color: 'red' }
    return (
      <div>
        <h3>{params ? "Edit student" : "Add Student"}</h3>
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
                <td> <label htmlFor="fname">First name</label> <br />
                  <input type="text" name='name' id='fname' onChange={(e) => this.setState({ firstName: e.target.value })}
                    value={this.state.firstName} required />
                </td>
                {this.state.error && !this.state.firstName && <td style={mystyle}>must not be empty</td>}
              </tr>

              <tr>
                <td> <label htmlFor="lname">Last name</label> <br />
                  <input type="text" name='laname' id='lname' onChange={(e) => this.setState({ lastName: e.target.value })}
                    value={this.state.lastName} required />
                </td>
                {this.state.error && !this.state.lastName && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="log">College id</label> <br />
                  <input type="text" id='log' onChange={(e) => this.setState({ collegeId: e.target.value })}
                    value={this.state.collegeId} required />
                </td>
                {this.state.error && !this.state.collegeId && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="pass">Email id</label> <br />
                  <input type="text" id='pass' onChange={(e) => this.setState({ emailId: e.target.value })}
                    value={this.state.emailId} required />
                </td>
                {this.state.error && !this.state.emailId && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="role">Mobile Number</label> <br />
                  {/* <select name="" id="">
                <option value="Name">Click Name for role id<input type="text" id='role'  /></option>
              </select> */}
                  <input type="text" id='role' onChange={(e) => this.setState({ mobileNo: e.target.value })}
                    value={this.state.mobileNo} required />
                </td>
                {this.state.error && !this.state.mobileNo && <td style={mystyle}>must not be empty</td>}

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
