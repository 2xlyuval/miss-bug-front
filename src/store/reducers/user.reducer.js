import { userService } from "../../services/user.service"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: cmd.user,
      }

    case LOGOUT:
      return {
        ...state,
        loggedInUser: null,
      }

    default:
      return state
  }
}
