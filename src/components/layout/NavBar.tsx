import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/logo.svg'; 
function Navigation() {
    return (
        <nav>
            <Link to="/" className="logo"><img src={logo} alt="icon image" className="home-icon"/></Link>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
        </nav>
    )
}

export default Navigation;