import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  const navigate = useNavigate()

  //   useEffect(()=>{
  //   const auth = localStorage.getItem("user");
  //   if(auth){
  //     navigate("/")
  //   }
  // },[]) 

  const [state, setState] = useState({
    loginId: "",
    password: "",
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState(false)

  const reset = () => {
    setState({
      loginId: "",
      password: "",
    })
    setError(false);
    setMsg('')
  }
  const login = () => {
    axios.post("https://manraj-ors-1.onrender.com/login", state).then((res) => {
      console.log(res.data)
      if (res.data.message === 'Enter LoginId And Password') {
        setMsg(res.data.result)
        setError(true);
      } else if (res.data.message === 'No result found') {
        setMsg(res.data.message);
        setError(true)
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        setError(false)
        // localStorage.setItem("auth", JSON.stringify(res.data.auth))
        navigate("/")
      }
    })
  }
  const myStyle = { color: "red" };
  return (
    <div >
      <h3 align='center'>LOGIN FORM</h3>

      <div align="center" className='t1'>
       {error && <p style={myStyle}>{msg}</p>}
        <table align='center'>
          <tbody className='tb1'>
            <tr>
              <td> <label htmlFor="fname">Login id</label> <br />
                <input type="text" name='name' id='fname' onChange={(e) => setState({ ...state, loginId: e.target.value })}
                  value={state.loginId} required />
                {error && !state.loginId && <p style={myStyle}>must not be empty</p>}

              </td>
            </tr>
            <tr>
              <td> <label htmlFor="lname">Password</label> <br />
                <input type="text" name='laname' id='lname' onChange={(e) => setState({ ...state, password: e.target.value })}
                  value={state.password} required />
                {error && !state.password && <p style={myStyle}>must not be empty</p>}
              </td>
            </tr>
            <tr>
              <td>
                <button className='btn btn-primary' onClick={login}> Submit</button>
              </td>
              <td>
                <button className='btn btn-primary btn1' onClick={reset}>Reset</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div >
  )

}
