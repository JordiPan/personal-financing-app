import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/login.css";
//Make it prettier later
function Register() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Register";
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(fName, lName, email, password);
  }
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="fname-input" className="form-label">
          First name
        </label>
        <input
          type="text"
          id="fname-input"
          className="input"
          required
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />

        <label htmlFor="lname-input" className="form-label">
          Last name
        </label>
        <input
          type="text"
          id="lname-input"
          className="input"
          required
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />

        <label htmlFor="email-input" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email-input"
          className="input"
          required
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input type="submit" className="submit-button" value="Register" />
        <Link to="/login">Go to login</Link>
      </form>
    </div>
  );
}

export default Register;
