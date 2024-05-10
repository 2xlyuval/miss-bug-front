import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { userService } from "../services/user.service"
import { bugService } from "../services/bug.service"
import { BugList } from "../cmps/BugList"
import { Link } from "react-router-dom"

export function UserDetails() {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const [userBugs, setUserBugs] = useState(null)

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    if (user) loadUserBugs()
  }, [user])

  async function loadUser() {
    const user = await userService.getById(userId)
    setUser(user)
  }

  async function loadUserBugs() {
    const bugs = await bugService.query({ createdBy: userId })
    setUserBugs(bugs)
  }

  if (!user) return <div>Loading user...</div>

  return (
    <div className="user-details">
      <h2>{user.userName}</h2>
      <h3>My bugs</h3>
      {userBugs && (
        <BugList
          bugs={userBugs}
          onRemoveBug={() => console.log("reMove bug")}
        />
      )}
      <Link to={`/user/`}>
        <button>Back to users</button>
      </Link>
    </div>
  )
}
