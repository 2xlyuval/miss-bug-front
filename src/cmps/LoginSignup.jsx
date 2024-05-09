import { useState } from "react"

export function LoginSignup() {
  const [account, setAccount] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div>
      {account && (
        <div>
          <h2>Hello {account.username}</h2>
          <button type="button" onClick={() => setAccount(null)}>
            Logout
          </button>
        </div>
      )}
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        {!isLogin && (
          <label>
            User Name:
            <input type="text" name="username" />
          </label>
        )}
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        {isLogin ? (
          <button type="button">Login</button>
        ) : (
          <button type="button">Signup</button>
        )}
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  )
}
