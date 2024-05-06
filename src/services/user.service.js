import Axios from "axios"
var axios = Axios.create({
  withCredentials: true,
})

const BASE_URL = "//localhost:3030/api/user/"

export const userService = {
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
  getDefaultUser,
}

async function query(filterBy = {}) {
  var { data: users } = await axios.get(BASE_URL, {
    params: filterBy,
  })

  return users
}

async function remove(userId) {
  await axios.delete(`${BASE_URL}${userId}`)
}

async function getById(userId) {
  const { data: user } = await axios.get(`${BASE_URL}${userId}`)
  return user
}

async function save(user) {
  const method = user._id ? "put" : "post"
  const { data: savedUser } = await axios[method](
    BASE_URL + (user._id || ""),
    user
  )

  return savedUser
}

function getDefaultFilter() {
  return {
    txt: "",
    score: "",
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

function getDefaultUser() {
  return {
    fullName: "",
    userName: "",
    score: 0,
  }
}
