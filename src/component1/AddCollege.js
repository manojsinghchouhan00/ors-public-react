import React from 'react'
import axios from 'axios';
// import { Link, Navigate, Route, Routes } from 'react-router-dom';
// import withRouter from '../component2/withRouter';

class AddCollege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      collegeName: '',
      mobileNo: '',
      state: '',
      message: '',
      error: false
    };
    const params = window.location.pathname.split('/')[2];
    if (params) {
      this.get(params);
    }
  }

  get(params) {
    axios.get("https://manraj-ors-1.onrender.com/college/" + params, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
    }).then((res) => {
      // console.log(res)
      this.setState({
        address: res.data.address,
        city: res.data.address,
        collegeName: res.data.collegeName,
        mobileNo: res.data.mobileNo,
        state: res.data.state,

      })
    })
  }

  submit() {
    const params = window.location.pathname.split('/')[2];
    if (params) {
      axios.put("https://manraj-ors-1.onrender.com/college/" + params, this.state, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        if (!this.state.collegeName || !this.state.address || !this.state.mobileNo || !this.state.city || !this.state.state) {
          this.setState({ error: true })
        } else {
          this.setState({ message: "College successfully added" })
          this.setState({ error: true });
          // setTimeout(() => {
                     
          // }, 2500);
        }
      })
    } else {
      axios.post("https://manraj-ors-1.onrender.com/college", this.state, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((res) => {
        console.log(res.data)
        if (!res.data.collegeName || !res.data.address || !res.data.mobileNo || !res.data.city || !res.data.state) {
          this.setState({ error: true })
          this.setState({ message: res.data.result })
        } else if (res.data.result) {
          this.setState({ message: res.data.result })
          this.setState({ error: true })
        } else {
          this.setState({ message: "College successfully added" })
          this.setState({ error: true });
        }
      })
    }
  }
  reset = () => {
    console.log("reset")
    this.setState({
      address: '',
      city: '',
      collegeName: '',
      mobileNo: '',
      state: '',
      message: '',
      error: false
    });
  }
  render() {
    // const auth = localStorage.getItem("user")
    const params = window.location.pathname.split('/')[2];

    const mystyle = { color: 'red' }
    return (
      <div>
        <h3>
          {
            params ? "Edit College" : "Add College"
          }
        </h3>
        <div align="center" className='t1'>
          {this.state.error && this.state.message && <p style={mystyle}>{this.state.message}</p>}
          <table >
            <tbody className='tb1'>
              <tr>
                <td>
                  <input type="number" name='id' id='id' onChange={(e) => this.setState({ _id: e.target.value })}
                    value={this.state.id} hidden />
                </td>
              </tr>

              <tr>
                <td> <label htmlFor="fname">Name</label> <br />
                  <input type="text" name='name' id='fname' onChange={(e) => this.setState({ collegeName: e.target.value })}
                    value={this.state.collegeName} required />
                </td>
                {this.state.error && !this.state.collegeName && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="lname">Address</label> <br />
                  <input type="text" name='address' id='lname' onChange={(e) => this.setState({ address: e.target.value })}
                    value={this.state.address} required />
                </td>
                {this.state.error && !this.state.address && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="log">Phone number</label> <br />
                  <input type="number" id='log' onChange={(e) => this.setState({ mobileNo: e.target.value })}
                    value={this.state.mobileNo} required />
                </td>
                {this.state.error && !this.state.mobileNo && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="pass">City</label> <br />
                  <input type="text" name='city' id='pass' onChange={(e) => this.setState({ city: e.target.value })}
                    value={this.state.city} required />
                </td>
                {this.state.error && !this.state.city && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td> <label htmlFor="role">State</label> <br />
                  <input type="text" name='state' id='role' onChange={(e) => this.setState({ state: e.target.value })}
                    value={this.state.state} required />
                </td>
                {this.state.error && !this.state.state && <td style={mystyle}>must not be empty</td>}

              </tr>

              <tr>
                <td>
                  <button className='btn btn-primary' onClick={() => this.submit()}> Submit</button>
                </td>
                <td>
                  <button className='btn btn-primary btn1' onClick={this.reset}>Reset</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
export default AddCollege;