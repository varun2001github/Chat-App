import React from 'react'
import "./login-screen.css"
function LoginScreen() {
  return (
    <div className="login-screen-container">
      <p className="login-title">Welcome!</p>
      <div>
        <p>Email</p>
        <input placeholder="youremail@example.com" />
      </div>

      <div>
        <p>Password</p>
        <input type="password" placeholder="Strong password" />
      </div>

      <button onclick="signup()" className="register-button">Register</button>
      <button onclick="" className="login-button">Login</button>
    </div>
  )
}
export default LoginScreen