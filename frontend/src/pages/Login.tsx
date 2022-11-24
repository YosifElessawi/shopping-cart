import { Container } from "@mui/material"
import React, { useState } from "react"
import "../css/login.css"

export const Login = () => {
  let [authMode, setAuthMode] = useState("Login")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // States for checking the errors
  const [logedIn, setLogedIn] = useState(false)
  const [error, setError] = useState(false)

  // Change form
  const changeAuthMode = () => {
    setAuthMode(authMode === "Login" ? "Register" : "Login")
    setLogedIn(false)
  }

  // Handling the name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
    setLogedIn(false)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
    setLogedIn(false)
  }

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setLogedIn(false)
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setLogedIn(false)
  }

  // Handling the form submission
  const handleRegister = (e) => {
    e.preventDefault()
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword != password
    ) {
      setError(true)
    } else {
      async function register() {
        // POST request using fetch with async/await
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          }),
        }
        const response = await fetch(
          "http://localhost:3000/users",
          requestOptions
        )
        const data = await response.json()
        console.log(data)
      }
      register()
      setLogedIn(true)
      setError(false)
    }
  }
  const handleLogin = (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      setError(true)
    } else {
      setLogedIn(true)
      setError(false)
    }
  }
  const handleLogout = (e) => {
    e.preventDefault()
    setLogedIn(false)
    setAuthMode("Login")
  }

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}>
        Missing fields or passwords does not match!
      </div>
    )
  }
  if (authMode === "Login") {
    return (
      <Container
        sx={{
          marginTop: "2em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1,
          borderColor: "Green",
          borderRadius: "2em",
        }}>
        <div>
          <h2 className="form-header">Login</h2>
        </div>
        <div className="form-toggle">
          New User ?{" "}
          <span className="link" onClick={changeAuthMode}>
            Register
          </span>
        </div>
        {errorMessage()}
        <form className="form-body">
          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            placeholder="email"
            value={email}
            type="text"
          />
          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            placeholder="password"
            value={password}
            type="password"
          />
          <button onClick={handleLogin} className="btn" type="submit">
            Login
          </button>
        </form>
      </Container>
    )
  }

  return (
    <Container
      sx={{
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
        borderColor: "Green",
        borderRadius: "2em",
      }}>
      <div>
        <h2 className="form-header">Register</h2>
      </div>
      <div className="form-toggle">
        Already Registerd ?{" "}
        <span className="link" onClick={changeAuthMode}>
          Login
        </span>
      </div>
      {errorMessage()}
      <form className="form-body">
        <label className="label">firstname</label>
        <input
          onChange={handleFirstName}
          className="input"
          placeholder="firstname"
          value={firstName}
          type="text"
        />
        <label className="label">lastname</label>
        <input
          onChange={handleLastName}
          className="input"
          placeholder="lastname"
          value={lastName}
          type="text"
        />
        <label className="label">email</label>
        <input
          onChange={handleEmail}
          className="input"
          placeholder="email"
          value={email}
          type="email"
        />
        <label className="label">password</label>
        <input
          onChange={handlePassword}
          className="input"
          placeholder="password"
          value={password}
          type="password"
        />
        <label className="label">confrimPassword</label>
        <input
          onChange={handleConfirmPassword}
          className="input"
          placeholder="confirm password"
          value={confirmPassword}
          type="password"
        />
        <button onClick={handleRegister} className="btn" type="submit">
          Register
        </button>
      </form>
    </Container>
  )
}
