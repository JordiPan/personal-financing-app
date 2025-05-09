import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/apiBackendServices";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../api/interfaces/auth/CustomJwtPayload";
import { useEffect, useState } from "react";

function NavigationBar() {
  const { token, setToken, isLoading, setIsLoading } = useAuth();
  let role = "";
  if (token) {
    try {
      let decoded = jwtDecode(token) as CustomJwtPayload;
      role = decoded.role;
    } catch (error) {
      console.log(error);
      role = "";
    }
  }

  const handleLogout = async () => {
    await logout()
      .then((res) => {
        console.log(res.data?.message);
        setToken(null);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  if(isLoading) {
    return (<><nav></nav></>)
  }
  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="icon image" className="home-icon" />
      </Link>

      {!role && (
        <Link to="/about" className="nav-link">
          About
        </Link>
      )}

      {role == "user" && (
        <>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
          <Link to="/items" className="nav-link">
            Items
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </>
      )}

      {!role ? (
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      ) : (
        <NavLink to="/login" className="nav-link" onClick={handleLogout}>
          Logout
        </NavLink>
      )}
    </nav>
  );
}

export default NavigationBar;
