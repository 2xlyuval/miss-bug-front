import { useState } from "react"
import { userService } from "../services/user.service"
import { Link, useNavigate } from "react-router-dom"

export function LoginSignup() {
  // Will be in the store in the future~~
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedinUser()
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
      const user = await userService.signup(credentials)
      console.log("Signup Succesful!", user)
      setLoggedinUser(user)
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
      const user = await userService.login(credentials)
      console.log("Login Succesful!", user)
      setLoggedinUser(user)
    } catch (err) {
      console.log("Error from onLogin ->", err)
    }
  }

  async function onLogout() {
    try {
      await userService.logout()
      setLoggedinUser(null)
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
