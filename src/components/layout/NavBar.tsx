import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
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
          <Link to="/about" className="nav-link">
            About
          </Link>
        </>
      )}

      {role == "user" && (
        <>
          <Link to="/dashboard" className="logo">
            <img src={logo} alt="icon image" className="home-icon" />
          </Link>
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
        <a className="nav-link" onClick={handleLogout}>
          Logout
        </a>
      )}
    </nav>
  );
}

export default NavigationBar;
