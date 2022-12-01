import React, { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios"
import { Link } from "react-router-dom"
const LOGIN_URL = "/auth"
type LoginProps = {
  logIn: () => void
  loggedIn: boolean
}

export const Login = ({ loggedIn, logIn }: LoginProps) => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef<HTMLInputElement>(null!)
  const errRef = useRef<HTMLParagraphElement>(null)

  const [user, setUser] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ user, pwd, roles, accessToken })
      setUser("")
      setPwd("")
      logIn
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
    <>
      {loggedIn ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
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
              onChange={(e) => setUser(e.target.value)}
              value={user}
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
            <button>Log In</button>
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
        </section>
      )}
    </>
  )
}

export default Login
