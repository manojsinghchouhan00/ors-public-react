import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      mode: "white"
    }
  }


  modeHandl = () => {
    if (this.state.mode === "blue") {
      document.body.style.backgroundColor = "White"
      document.body.style.color = "black"
      this.setState({ mode: "white" })
    } else if (this.state.mode === "white") {
      document.body.style.backgroundColor = "blue"
      document.body.style.color = "white"
      this.setState({ mode: "blue" })

    }
  }

  render() {
    // const auth = JSON.parse(localStorage.getItem("user"))
    let auth = localStorage.getItem("user");

    if (auth) {
      try {
        auth = JSON.parse(auth);
        // Use the `auth` object here
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        // Handle the parsing error, e.g., display an error message or provide a default value
      }
    } else {
      console.error("No 'user' data found in local storage");
      // Handle the case where the 'user' data is not present in local storage
    }


    let mystyle = {
      width: '90px',
      borderRadius: '10px',
      height: '40px'
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark " data-bs-theme="dark">
          <div className="container-fluid">
            {/* <img style={mystyle} src={require("../image/Logo.jpg")} alt="Rays-logo" /> */}
            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                {
                  !auth ?
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/registration">Registration</Link>
                      </li>

                    </> :
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link active dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                          User
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/adduser">Add user</Link></li>
                          <li><Link className="dropdown-item" to="/userlist">User list</Link></li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link active dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          College
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/addcollege">Add user</Link></li>
                          <li><Link className="dropdown-item" to="/collegelist">College list</Link></li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link active dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Student
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/addstudent">Add Student</Link></li>
                          <li><Link className="dropdown-item" to="/studentlist">Student list</Link></li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link active dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Marksheet
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/addmarksheet">Add Marksheet</Link></li>
                          <li><Link className="dropdown-item" to="/marksheetlist">Marksheet list</Link></li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link active dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Role
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/addrole">Add Role</Link></li>
                          <li><Link className="dropdown-item" to="/rolelist">Role list</Link></li>
                        </ul>

                      </li>

                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/logout">Logout({auth.firstName})</Link>
                      </li>
                    </>
                }
              </ul>



              <div className="nav-item form-check form-switch form-check-reverse text-light" >
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" onChange={this.modeHandl} />
                <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Dark mode</label>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
