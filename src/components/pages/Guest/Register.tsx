import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/login.css";
import { register } from "../../../api/apiBackendServices.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
//Make it prettier later
function Register() {
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setDate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Register";
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        register({ fName, lName, birthdate, email, password })
            .then((res) => {
                console.log("Response:", res.data.message);
                // navigate('/user',{state: res.data})
                navigate("/login");
            })
            .catch((error: AxiosError<{ message: string }>) =>
                console.log("error: ", error)
            );
    }
    return (
        <div className="container container-color-dark">
            <h1>Register</h1>
            <form className="user-form" onSubmit={handleSubmit}>
                <label htmlFor="fname-input" className="form-label">
                    First name
                </label>
                <input
                    type="text"
                    id="fname-input"
                    className="input"
                    required
                    value={fName}
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
                    value={lName}
                    onChange={(e) => {
                        setLname(e.target.value);
                    }}
                />

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
                <label htmlFor="date-input" className="form-label">
                    Birthdate
                </label>
                <input
                    type="date"
                    id="date-input"
                    className="input"
                    required
                    value={birthdate}
                    min="1940-12-31"
                    max="2025-01-01"
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />

                <input
                    type="submit"
                    className="submit-button form-button"
                    value="Register"
                />
                <Link to="/login">Go to login</Link>
            </form>
        </div>
    );
}

export default Register;
