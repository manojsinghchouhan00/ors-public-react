import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddRole() {
  const [name, setName] = useState('')
  const [discription, setDiscription] = useState('')
  const [msg, setMsg] = useState('')
  const [em, setEm] = useState(false)

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios.get(`https://manraj-ors-1.onrender.com/role/${params.id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((resp) => {
        console.log("upsdat", resp.data)
        setName(resp.data.name)
        setDiscription(resp.data.discription)
      })
    }
  }, [])

  function resubmit() {
    console.log(name, discription)
    if (name && discription) {
      axios.put("https://manraj-ors-1.onrender.com/role/" + params.id, { name, discription }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((resp) => {
        // setDiscription('')
        if (params.id) {
          setMsg(`Your role id is: ${params.id}`)
        } else {
          setMsg(`Your role id is: ${resp.data._id}`)
        }

        setEm(false)
      }).catch((err) => {
        console.log("err", err)
      })
    } else {
      setMsg("Fill the form")
      setEm(true)
    }
  }
  function submit() {
    if (name && discription) {
      axios.post("https://manraj-ors-1.onrender.com/role", { name, discription }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}` }
      }).then((resp) => {
        setDiscription('')
        setMsg(`Your role id is: ${resp.data._id}`)
        setEm(false)
      }).catch((err) => {
        console.log("err", err)
      })
    } else {
      setMsg("Fill the form")
      setEm(true)
    }

  }
  function reset() {
    console.log("reset")
    setName('')
    setDiscription('')
    setMsg('')
  }

  const myStyle = {
    color: "red"
  }

  // console.log(props)
  return (
    <div >
      <span align="center"> <h3  >{params.id ? "Update Role" : "Add Role"} </h3>
        <p style={myStyle}>{msg}</p>
      </span>

      <div className='t1'>
        <table align="center">
          <tbody className='tb1'>

            <tr>
              <td> <label htmlFor="fname">Name</label> <br />
                <input type="text" name='name' id='fname' onChange={(e) => setName(e.target.value)}
                  value={name} required />
                {em && !name && <p style={myStyle}>Enter name</p>}
              </td>
            </tr>

            <tr>
              <td> <label htmlFor="lname">Discription</label> <br />
                <input type="text" name='discriptions' id='lname' onChange={(e) => setDiscription(e.target.value)}
                  value={discription} required />
                {em && !discription && <p style={myStyle}>Enter Discription</p>}

              </td>
            </tr>

            <tr>
              {
                params.id ? <td>
                  <button className='btn btn-primary' onClick={() => resubmit()}> update</button>
                </td> :
                  <td>
                    <button className='btn btn-primary' onClick={() => submit()}> Submit</button>
                  </td>
              }
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

