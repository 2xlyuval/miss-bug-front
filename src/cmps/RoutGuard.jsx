import { useSelector } from "react-redux"
import { Navigate } from "react-router"

export function RoutGuard({ children }) {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  if (!loggedInUser?.isAdmin) return <Navigate to="/bug" />

  return children
}
