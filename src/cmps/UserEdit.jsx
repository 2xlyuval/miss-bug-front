import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { Link } from "react-router-dom"

export function UserEdit() {
  const [user, setUser] = useState(userService.getDefaultUser())
  const { userId } = useParams()
  const context = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId !== "edit") loadUser()
  }, [userId])

  async function loadUser() {
    const user = await userService.getById(userId)
    setUser(user)
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    context.onSaveUser(user)
    navigate("/user")
  }

  return (
    <div className="user-edit">
      <Link to="/user">
        <button>Back</button>
      </Link>

      <h1>User Edit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={user.fullName}
          />
        </div>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={handleChange}
            value={user.userName}
          />
        </div>
        <div>
          <label htmlFor="score">Score</label>
          <input
            type="text"
            id="score"
            name="score"
            onChange={handleChange}
            value={user.score}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  )
}
