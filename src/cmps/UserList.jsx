import { Link, useNavigate } from "react-router-dom"
import { UserPreview } from "./UserPreview"

export function UserList({ users, onRemoveUser }) {
  const navigate = useNavigate()
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user._id}>
          <UserPreview user={user} />
          <div className="user-actions">
            <button onClick={() => navigate(`/user/edit/${user._id}`)}>
              Edit
            </button>
            <button onClick={() => onRemoveUser(user._id)}>X</button>
          </div>
          <Link to={`/user/${user._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
