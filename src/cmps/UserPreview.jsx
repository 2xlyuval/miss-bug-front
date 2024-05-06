export function UserPreview({ user }) {
  return (
    <div>
      <h3>{user.fullName}</h3>
      <div>
        <span>Score: </span>
        <span>{user.score}</span>
      </div>
    </div>
  )
}
