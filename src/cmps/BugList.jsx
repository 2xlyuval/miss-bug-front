import { Link, useNavigate } from "react-router-dom"
import { BugPreview } from "./BugPreview"

export function BugList({ bugs, onRemoveBug }) {
  const navigate = useNavigate()
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
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
          <Link to={`/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
