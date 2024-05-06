import { bugService } from "../services/bug.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { BugList } from "../cmps/BugList.jsx"
import { useState } from "react"
import { useEffect } from "react"
import { BugFilter } from "../cmps/BugFilter.jsx"
import { utilService } from "../services/util.service.js"

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const debounceSetFilterBy = utilService.debounce(onSetFilterBy, 500)

  useEffect(() => {
    loadBugs()
  }, [filterBy])

  async function loadBugs() {
    const bugs = await bugService.query(filterBy)
    setBugs(bugs)
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log("Deleted Succesfully!")
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg("Bug removed")
    } catch (err) {
      console.log("Error from onRemoveBug ->", err)
      showErrorMsg("Cannot remove bug")
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt("Bug title?"),
      severity: +prompt("Bug severity?"),
      description: prompt("Bug description?"),
    }
    try {
      const savedBug = await bugService.save(bug)
      console.log("Added Bug", savedBug)
      setBugs((prevBugs) => [...prevBugs, savedBug])
      showSuccessMsg("Bug added")
    } catch (err) {
      console.log("Error from onAddBug ->", err)
      showErrorMsg("Cannot add bug")
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt("New severity?")
    const description = prompt("New description?")
    const bugToSave = { ...bug, severity, description }

    try {
      const savedBug = await bugService.save(bugToSave)
      console.log("Updated Bug:", savedBug)
      setBugs((prevBugs) =>
        prevBugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        )
      )
      showSuccessMsg("Bug updated")
    } catch (err) {
      console.log("Error from onEditBug ->", err)
      showErrorMsg("Cannot update bug")
    }
  }

  function onDownloadBugs() {
    console.log("Downloading bugs...")
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  return (
    <main className="bug-index">
      <h3>Bugs App</h3>
      <BugFilter filterBy={filterBy} onSetFilterBy={debounceSetFilterBy} />
      <main>
        <button className="add-btn" onClick={onAddBug}>
          Add Bug ⛐
        </button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        <button onClick={onDownloadBugs}>Download Bugs</button>
      </main>
    </main>
  )
}
