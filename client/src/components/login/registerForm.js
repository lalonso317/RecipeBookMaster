import React, { useState } from "react"
// import { Link, Redirect } from 'react-router-dom'
import { usePosty } from "../../hooks"

export default function Register(props) {
  const [username, SetUsername] = useState("")
  const [password, SetPassword] = useState("")
  const [email, SetEmail] = useState("")
  const { create } = usePosty()

  function handleSubmit(e) {
    e.preventDefault()

    create(username, email, password).then(() => {
      props.history.push("/")
    })
  }
  return (
    <div>
      <div className="wholereg">
        <div className="reg">
          <h2 className="regs">Register</h2>
        </div>
        <div className="reginput">
          <form className="regform" onSubmit={handleSubmit}>
            <input
              className="reguser"
              type="text"
              placeholder="username"
              value={username}
              onChange={e => SetUsername(e.target.value)}
            ></input>
            <input
              className="regUser"
              type="text"
              placeholder="email"
              value={email}
              onChange={e => SetEmail(e.target.value)}
            ></input>
            <input
              className="regpass"
              type="text"
              placeholder="password"
              value={password}
              onChange={e => SetPassword(e.target.value)}
            ></input>
            <button className="regsub" type="submit">
              {" "}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
