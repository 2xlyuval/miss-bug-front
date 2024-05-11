import { Link, useNavigate } from "react-router-dom"
import { BugPreview } from "./BugPreview"
import { userService } from "../services/user.service"
import { useSelector } from "react-redux"

export function BugList({ bugs, onRemoveBug }) {
  const loggedinUser = useSelector((state) => state.userModule.loggedInUser)
  const navigate = useNavigate()

  function isUserAuthorized(bug) {
    return loggedinUser?.isAdmin || loggedinUser?._id === bug.creator._id
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          {isUserAuthorized(bug) && (
            <div className="bug-actions">
              <button
                onClick={() => {
                  onRemoveBug(bug._id)
                }}
              >
                x
              </button>
              <button
                onClick={() => {
                  navigate(`/bug/edit/${bug._id}`)
                }}
              >
                Edit
              </button>
            </div>
          )}
          <Link to={`/bug/${bug._id}`}>
            <button>Details</button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
