import { useEffect, useState } from "react"

export function BugFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const labels = [
    "UI",
    "design",
    "alignment",
    "text",
    "error message",
    "interaction",
    "button",
    "tooltip",
    "help",
    "link",
    "security",
    "web application",
    "XSS",
    "vulnerability",
    "networking",
    "buffer overflow",
    "SQL injection",
    "e-commerce",
    "DoS",
    "DNS",
    "Privilege escalation",
    "operating system",
  ]

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange(ev) {
    const { name, value, type } = ev.currentTarget
    setFilterByToEdit((prevFilterBy) => ({
      ...prevFilterBy,
      [name]: type === "number" ? +value : value,
    }))
  }

  return (
    <section className="bug-filter">
      <h4>Filter</h4>
      <input
        type="text"
        name="txt"
        value={filterByToEdit.txt}
        onChange={handleChange}
        placeholder="Search"
      />
      <input
        type="number"
        name="severity"
        value={filterByToEdit.severity}
        onChange={handleChange}
        placeholder="Severity"
      />
      <select
        name="labels"
        value={filterByToEdit.labels}
        onChange={handleChange}
      >
        <option value="">All</option>
        {labels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <h4>Sort</h4>
      <select
        name="sortBy"
        placeholder="Sort by"
        value={filterByToEdit.sortBy}
        onChange={handleChange}
      >
        <option value="createdAt">Created At</option>
        <option value="severity">Severity</option>
        <option value="title">Title</option>
      </select>
    </section>
  )
}
