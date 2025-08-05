import { NavLink, Link } from "react-router-dom";
import logo from "/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/apiBackendServices";
import { customjwtDecoder } from "../../api/CustomJwtDecoder";
import { useNavigate } from "react-router-dom";
function NavigationBar() {
  const { token, setToken, isLoading } = useAuth();
  const navigate = useNavigate();
  
  let role = "";
  if (token) {
    const decoded = customjwtDecoder(token);
    role = decoded.role;
  }

  const handleLogout = async () => {
    await logout()
      .then((res) => {
        console.log(res.data?.message);
        setToken(null);
        navigate('/', {replace: true})
      })
      .catch((res) => {
        console.error(res);
      });
  };
  if (isLoading) {
    return (
      <>
        <nav></nav>
      </>
    );
  }
  return (
    <nav>
      {!role && (
        <>
          <Link to="/" className="logo">
            <img src={logo} alt="icon image" className="home-icon" />
          </Link>
          <NavLink  to="/about" className="nav-link">
            About
          </NavLink>
        </>
      )}

      {role == "user" && (
        <>
          <NavLink to="/dashboard" className="logo">
            <img src={logo} alt="icon image" className="home-icon" />
          </NavLink>
          <NavLink to="/categories" className="nav-link">
            Categories
          </NavLink>
          <NavLink to="/items" className="nav-link">
            Items
          </NavLink>
          <NavLink  to="/profile" className="nav-link">
            Profile
          </NavLink>
        </>
      )}

      {!role ? (
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      ) : (
        <button className="nav-link logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default NavigationBar;
