import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { UserList } from "../cmps/UserList"
import { showErrorMsg } from "../services/event-bus.service"
import { Outlet } from "react-router"

export function UserIndex() {
  const [users, setUsers] = useState(null)
  const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())

  useEffect(() => {
    loadUsers()
  }, [filterBy])

  async function loadUsers() {
    const users = await userService.query(filterBy)
    setUsers(users)
  }

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
      showErrorMsg("remove user successfully!")
    } catch (error) {
      showErrorMsg("Cannot remove user")
    }
  }

  async function onSaveUser(user) {
    try {
      const savedUser = await userService.save(user)
      if (user._id) {
        setUsers((prevUsers) =>
          prevUsers.map((currUser) =>
            currUser._id === savedUser._id ? savedUser : currUser
          )
        )
      } else {
        setUsers((prevUsers) => [...prevUsers, savedUser])
      }
      showErrorMsg("save user successfully!")
    } catch (error) {
      showErrorMsg("Cannot save user")
    }
  }

  if (!users) return <div>Loading...</div>
  return (
    <main className="user-index">
      <h1>Users</h1>
      <UserList users={users} onRemoveUser={onRemoveUser} />
      <Outlet context={{ onSaveUser }} />
    </main>
  )
}
