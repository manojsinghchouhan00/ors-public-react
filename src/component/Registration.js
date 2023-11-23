import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./form.css"
import { useNavigate, useParams } from 'react-router-dom';

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setroleId] = useState('');
  const [id, setId] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const [priload, setPriload] = useState([]);

  const auth = localStorage.getItem("user")
  const navigate = useNavigate();
  const params = useParams();
  const list = () => {
    axios.get("https://manraj-ors-1.onrender.com/user"
      // , {   headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }    }
    ).then((res) => {
      console.log("responce", res)
      setPriload(res.data)
    })
  }
  const get = () => {
    axios.get("https://manraj-ors-1.onrender.com/user/" + params.id
      // , { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` } }
    ).then((res) => {
      console.log(res)
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setLoginId(res.data.loginId)
      setPassword(res.data.password)
      setroleId(res.data.roleId)
    })
  }
  useEffect(() => {
    if (params.id) {
      get()
    }
    list();
  }, [])

  function submit() {
    if (firstName && lastName && loginId && password && roleId) {
      if (params.id) {
        axios.put(`https://manraj-ors-1.onrender.com/user/${params.id}`, { firstName, lastName, loginId, password, roleId }, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
        }).then((resp) => {
          setResult("Register successful")
          setTimeout(() => {
            navigate("/userlist")
          }, 2500);
        }).catch((err) => {
          console.log("register err :", err)
        })
      } else {
        axios.post("https://manraj-ors-1.onrender.com/user", { firstName, lastName, loginId, password, roleId }
          // , {
          //   headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
          // }
        ).then((resp) => {
          // console.log(resp.data?.message)
          if (resp.data?.message === "Email id already exist") {
            // console.log("first : - ", resp.data?.message);
            setResult(resp.data.message)
          } else {
            // console.log("first-2 : - ", firstName, lastName, loginId, password, roleId);
            setResult("Register successful");
            if (auth === null) {
              navigate("/login");
            } else {
              navigate("/userlist");
            }
          }

        }).catch((err) => {
          console.log("register err :", err)
        })
      }
    } else {
      setMsg("must not be empty");
      setError(true);
    }

  }
  function reset() {
    console.log("reset register ")
    setId('');
    setFirstName('');
    setLastName('');
    setLoginId('');
    setPassword('');
    setroleId('');
    setMsg('');
    setResult('');
  }
  function priloader(e) {

    console.log("on mouse")
  }

  // change=(e)=>{
  //   let key = e.target.name;
  //   let value = e.target.value
  //   this.setState([key] : value)
  // }

  const mystyle = { color: "red", margin: "10px" };


  return (
    <div >
      <div align='center'>
        <h3>
          {
            auth ?
              !params.id ? "Add user" : "Edit user" : "Registration user"
          }
        </h3>
      </div>
      <div align="center" className='t1'>
        <p style={mystyle}>{result}</p>
        <table align='center'>
          <tbody className='tb1'>
            <tr>
              <td>
                <input type="password" name='id' id='id' onChange={(e) => setId(e.target.value)}
                  value={id} hidden />
              </td>
            </tr>

            <tr>
              <td> <label htmlFor="fname">First name</label> <br />
                <input type="text" name='name' id='fname' onChange={(e) => setFirstName(e.target.value)}
                  value={firstName} required />
              </td>
              {!firstName && error && <td style={mystyle}>{msg}</td>}

            </tr>

            <tr>
              <td> <label htmlFor="lname">Last name</label> <br />
                <input type="text" name='laname' id='lname' onChange={(e) => setLastName(e.target.value)}
                  value={lastName} required />
              </td>
              {!lastName && error && <td style={mystyle}>{msg}</td>}
            </tr>

            <tr>
              <td> <label htmlFor="log">Login id</label> <br />
                <input type="text" id='log' onChange={(e) => setLoginId(e.target.value)}
                  value={loginId} required />
              </td>
              {!loginId && error && <td style={mystyle}>{msg}</td>}
            </tr>

            <tr>
              <td> <label htmlFor="pass">Password</label> <br />
                <input type="password" id='pass' onChange={(e) => setPassword(e.target.value)}
                  value={password} required />
              </td>
              {!password && error && <td style={mystyle}>{msg}</td>}
            </tr>

            <tr>
              <td> <label htmlFor="role">Role id</label> <br />
                <select className='select' name="" id="" onClick={(e) => { setroleId(e.target.value); console.log("Roll id : - ", e.target.value) }}>
                  <option value={roleId}>Select Name</option>
                  {
                    priload.map((ele, i) => {
                      // console.log("Roll id : - ", ele._id)
                      return <option key={i} value={ele._id}>{ele.firstName}</option>
                    })
                  }
                </select>
                {/* <input type="text" id='role'
                  // onChange={(e) => setroleId(e.target.value)}
                  value={roleId} required /> */}
              </td>
              {!roleId && error && <td style={mystyle}>{msg}</td>}
            </tr>

            <tr>
              <td>
                <button className='btn btn-primary' onClick={() => submit()}> Submit</button>
              </td>
              <td>
                <button className='btn btn-primary btn1' onClick={() => reset()}>Reset</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  )

}