import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    document.title = "Login";
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, password)
  }
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="email-input" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email-input"
          className="input"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="email-input" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password-input"
          className="input"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input type="submit" className="submit-button" value="Login" />
        <Link to="/register">No account? Register here</Link>
      </form>
    </div>
  );
}

export default Login;
