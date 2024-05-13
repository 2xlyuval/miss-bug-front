import { userService } from "../../services/user.service"
import { LOGIN, LOGOUT } from "../reducers/user.reducer"
import { store } from "../store"

export async function login(userCred) {
  try {
    const user = await userService.login(userCred)
    store.dispatch({ type: LOGIN, user })
    return user
  } catch (error) {
    console.log("Error from login ->", error)
    throw error
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: LOGOUT })
  } catch (error) {
    console.log("Error from logout ->", error)
  }
}
