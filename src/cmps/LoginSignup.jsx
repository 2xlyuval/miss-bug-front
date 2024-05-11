import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { login, logout } from "../store/actions/user.action"

export function LoginSignup() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  )
  const [credentials, setCredentials] = useState({
    fullName: "",
    userName: "",
    password: "",
  })
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }))
  }

  async function onSignup(ev) {
    ev.preventDefault()
    try {
      if (
        !credentials.fullName ||
        !credentials.userName ||
        !credentials.password
      ) {
        console.log("Please fill in all fields")
        return
      }
      const user = await login(credentials)
      //Q - if it fail to login, it return undefined
      console.log("Signup Succesful!", user)
    } catch (err) {
      console.log("Error from onSignup ->", err)
    }
  }

  async function onLogin(ev) {
    ev.preventDefault()
    try {
      if (!credentials.userName || !credentials.password) {
        console.log("Please fill in all fields")
        return
      }

      const user = await login(credentials)
      //Q - if it fail to login, it return undefined
      console.log("Login Succesful!", user)
    } catch (err) {
      console.log("Error from onLogin ->", err)
    }
  }

  async function onLogout() {
    try {
      await logout()
      setCredentials({
        fullName: "",
        userName: "",
        password: "",
      })
      navigate("/bug")
    } catch (error) {
      console.log("Error from onLogout ->", error)
    }
  }

  return (
    <div>
      {loggedinUser ? (
        <div>
          <h2>Hello {loggedinUser.userName}</h2>
          <Link to={`/user/${loggedinUser._id}`}>My Bugs</Link>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>{isLogin ? "Login" : "Signup"}</h2>
          <form>
            <label>
              User Name:
              <input
                type="text"
                name="userName"
                value={credentials.userName}
                onChange={handleChange}
              />
            </label>
            <br />
            {!isLogin && (
              <label>
                Full Name:
                <input
                  type="fullName"
                  name="fullName"
                  value={credentials.fullName}
                  onChange={handleChange}
                />
              </label>
            )}
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </label>
            <br />
            {isLogin ? (
              <button type="button" onClick={onLogin}>
                Login
              </button>
            ) : (
              <button type="button" onClick={onSignup}>
                Signup
              </button>
            )}
          </form>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
