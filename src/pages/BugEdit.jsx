import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
// import { bugService } from "../services/_bug.service.local"
import { bugService } from "../services/bug.service"

export function BugEdit() {
  const { bugId } = useParams()
  const [bug, setBug] = useState(bugService.getDefaultBug())
  const context = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (bugId !== "new") loadBug()
  }, [])

  async function loadBug() {
    try {
      const bug = await bugService.getById(bugId)
      setBug(bug)
    } catch (error) {
      console.log("Error from loadBug ->", error)
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setBug((prevBug) => ({
      ...prevBug,
      [name]: name === "severity" ? +value : value,
    }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (bugId !== "new") {
      context.onUpdateBug(bug)
    } else {
      context.onAddBug(bug)
    }
    navigate("/bug")
  }

  if (!bug) return <div>Loading...</div>

  return (
    <div className="bug-edit">
      <h1>Bug Edit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bug.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={bug.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="severity">Severity</label>
          <input
            type="number"
            id="severity"
            name="severity"
            value={bug.severity}
            onChange={handleChange}
          />
        </div>
        <button>Save</button>
        <button onClick={() => navigate("/bug")}>Cancel</button>
      </form>
    </div>
  )
}
