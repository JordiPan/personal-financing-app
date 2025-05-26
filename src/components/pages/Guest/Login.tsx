import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../../api/apiBackendServices";
import { AxiosError } from "axios";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = "Login";
  });
  //maybe sanitization later
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login({ email, password })
      .then((res) => {
        setToken(res.data.access_token);
        const from = location.state?.from?.pathname || "/dashboard"; // uh im not sure if i want the admin to have dashboard to so... this may not work later down the line
        navigate(from, { replace: true });
      })
      .catch((res: AxiosError) => {
        console.log(res);
      });
  }
  return (
    <div className="container container-color-dark">
      <h1>Login</h1>
      <form className="default-form-container" onSubmit={handleSubmit}>
        <div className="input-group">
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
        </div>
        <div className="input-group">
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
        </div>

        <input
          type="submit"
          className="submit-button form-button"
          value="Login"
        />
        <Link to="/register" className="register-link">
          No account? Register here
        </Link>
      </form>
    </div>
  );
}

export default Login;
