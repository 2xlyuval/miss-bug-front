import { NavLink } from "react-router-dom"
import { LoginSignup } from "./LoginSignup"
import { useSelector } from "react-redux"

export function AppHeader() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  return (
    <header className="app-header container">
      <div className="header-container">
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/bug">Bugs</NavLink>
          <NavLink to="/about">About</NavLink>
          {loggedInUser?.isAdmin && <NavLink to="/user">User</NavLink>}
        </nav>
        <h1>Bugs are Forever</h1>
        <LoginSignup />
      </div>
    </header>
  )
}
