import { bugsData } from "../data-local/bug"
import { storageService } from "./async-storage.service"

export const bugService = {
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
}

const STORAGE_KEY = "bug"
_createBugs()

export async function query(filterBy = {}) {
  try {
    const bugs = await storageService.query(STORAGE_KEY)
    // if (filterBy) {

    // }
    return bugs
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
