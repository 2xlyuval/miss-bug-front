import Axios from "axios"
var axios = Axios.create({
  withCredentials: true,
})

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3030/api/"

const BASE_USER_URL = BASE_URL + "user/"
const BASE_AUTH_URL = BASE_URL + "auth/"

export const userService = {
  signup,
  login,
  logout,
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
  getDefaultUser,
  getLoggedinUser,
}

window.userService = userService

async function signup(userCred) {
  const { data: user } = await axios.post(BASE_AUTH_URL + "signup", userCred)
  return saveLocalUser(user)
}

async function login(userCred) {
  const { data: user } = await axios.post(BASE_AUTH_URL + "login", userCred)
  return saveLocalUser(user)
}

async function logout() {
  await axios.post(BASE_AUTH_URL + "logout")
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    score: user.score,
    isAdmin: user.isAdmin,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function query(filterBy = {}) {
  var { data: users } = await axios.get(BASE_USER_URL, {
    params: filterBy,
  })

  return users
}

async function remove(userId) {
  await axios.delete(`${BASE_USER_URL}${userId}`)
}

async function getById(userId) {
  const { data: user } = await axios.get(`${BASE_USER_URL}${userId}`)
  return user
}

async function save(user) {
  const method = user._id ? "put" : "post"
  const { data: savedUser } = await axios[method](
    BASE_USER_URL + (user._id || ""),
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
