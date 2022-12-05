import React, { useRef, useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import axios from "../api/axios"
import { Link } from "react-router-dom"
import "../css/register.css"
import { Container } from "@mui/system"

const LOGIN_URL = "/users/login"
type LoginProps = {
  logIn: () => void
  loggedIn: boolean
}

export const Login = ({ loggedIn, logIn }: LoginProps) => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef<HTMLInputElement>(null!)
  const errRef = useRef<HTMLParagraphElement>(null)

  const [username, setUserName] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [username, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      setAuth({ username, pwd, accessToken })
      setUserName("")
      setPwd("")
      logIn()
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current?.focus()
    }
  }

  return (
    <Container
      sx={{
        marginTop: "20vh",
        width: "100%",
        maxWidth: "420px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "1rem",
        backgroundColor: "blue",
        borderRadius: "0.7rem",
      }}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button className="submit">Log In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <Link
          className="link"
          key={"register"}
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to={`/register`}>
          Login
        </Link>
      </p>
    </Container>
  )
}

export default Login
