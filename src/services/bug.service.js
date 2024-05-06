import Axios from "axios"
var axios = Axios.create({
  withCredentials: true,
})

// const BASE_URL = "/api/bug/"
// const BASE_URL = "http://localhost:3030/api/bug/"
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/bug/"
    : "http://localhost:3030/api/bug/"

export const bugService = {
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
}

async function query(filterBy = {}) {
  var { data: bugs } = await axios.get(BASE_URL, {
    params: filterBy,
  })

  return bugs
}

async function remove(bugId) {
  await axios.delete(`${BASE_URL}${bugId}`)
}

async function getById(bugId) {
  const { data: bug } = await axios.get(`${BASE_URL}${bugId}`)
  return bug
}

async function save(bug) {
  const method = bug._id ? "put" : "post"
  const { data: savedBug } = await axios[method](
    BASE_URL + (bug._id || ""),
    bug
  )

  return savedBug
}

function getDefaultFilter() {
  return {
    txt: "",
    severity: "",
    labels: "",
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
