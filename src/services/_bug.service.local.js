import { bugsData } from "../data-local/bug"
import { storageService } from "./async-storage.service"

export const bugService = {
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
  getDefaultBug,
}

const STORAGE_KEY = "bug"
const PAGE_SIZE = 5
_createBugs()

export async function query(filterBy = {}) {
  try {
    const bugs = await storageService.query(STORAGE_KEY)

    let filteredBugs = [...bugs]

    if (filterBy) {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, "i")
        filteredBugs = filteredBugs.filter(
          (bug) => regExp.test(bug.title) || regExp.test(bug.description)
        )
      }

      if (filterBy.severity) {
        filterBy.severity = +filterBy.severity

        filteredBugs = filteredBugs.filter(
          (bug) => bug.severity >= filterBy.severity
        )
      }

      if (filterBy.labels) {
        filteredBugs = filteredBugs.filter((bug) =>
          bug.labels.some((label) => label === filterBy.labels)
        )
      }

      //sort by title / severity / createdAt
      if (filterBy.sortBy) {
        // if there is filterBy.ascending, convert it to boolean
        if (filterBy.ascending === "true") filterBy.ascending = true
        else if (filterBy.ascending === "false") filterBy.ascending = false

        _sortBugs(filteredBugs, filterBy.sortBy, filterBy.ascending)
      }

      if (filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        filteredBugs = filteredBugs.slice(startIdx, startIdx + PAGE_SIZE)
      }
    }
    return filteredBugs
  } catch (error) {
    console.log("Error in bugService.query:", error)
  }
}

export async function getById(bugId) {
  try {
    return await storageService.get(STORAGE_KEY, bugId)
  } catch (error) {
    console.log("Error in bugService.getById:", error)
  }
}

export async function save(bug) {
  try {
    if (bug._id) {
      return await storageService.put(STORAGE_KEY, bug)
    } else {
      return await storageService.post(STORAGE_KEY, bug)
    }
  } catch (error) {
    console.log("Error in bugService.save:", error)
  }
}

export async function remove(bugId) {
  try {
    return await storageService.remove(STORAGE_KEY, bugId)
  } catch (error) {
    console.log("Error in bugService.remove:", error)
  }
}

function getDefaultFilter() {
  return {
    txt: "",
    severity: "",
    labels: "",
    sortBy: "createdAt",
    pageIdx: 0,
  }
}

function getDefaultBug() {
  return {
    title: "",
    description: "",
    severity: 1,
  }
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {
    // type: searchParams.get('type'),
    // model:
  }
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field]
  }
  return filterBy
}

function _createBugs() {
  const bugs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  if (!bugs.length) {
    const bugs = bugsData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs))
  }
}

function _sortBugs(bugs, sortBy, ascending = true) {
  if (sortBy === "title") {
    bugs.sort((a, b) => {
      const bugTitleA = a.title.toUpperCase()
      const bugTitleB = b.title.toUpperCase()

      if (bugTitleA < bugTitleB) {
        return ascending ? -1 : 1
      }
      if (bugTitleA > bugTitleB) {
        return ascending ? 1 : -1
      }
      return 0
    })
  } else if (sortBy === "severity") {
    bugs.sort((a, b) =>
      ascending ? a.severity - b.severity : b.severity - a.severity
    )
  } else if (sortBy === "createdAt") {
    ascending = false
    bugs.sort((a, b) =>
      ascending ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
    )
  } else {
    console.error('Invalid sorting type. Please use "title" or "severity".')
  }
}
