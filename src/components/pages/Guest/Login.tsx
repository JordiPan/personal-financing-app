import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/login.css";
import { login } from "../../../api/apiBackendServices";
import { AxiosError } from "axios";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  useEffect(() => {
    document.title = "Login";
  });
  //maybe sanitization later
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login({email, password})
    .then((res) => {
      console.log("login:",res)
      setToken(res.data.access_token);
      navigate('/dashboard', {replace: true});
    })
    .catch((res: AxiosError) => {
      console.log(res)
    })
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

        <label htmlFor="password-input" className="form-label">
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
