import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/logo.svg'; 
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/apiBackendServices";
function NavigationBar() {
    const {role, setLoginInfo} = useAuth();

    return (
        <nav>
            <Link to="/" className="logo"><img src={logo} alt="icon image" className="home-icon"/></Link>
            <NavLink to="/about" className="nav-link">About</NavLink>
            {!role ? <NavLink to="/login" className="nav-link">Login</NavLink> : <NavLink to="/login" className="nav-link" 
            onClick={async () => {
                await logout()
                .then((res) => {
                    console.log(res.data?.message)
                    setLoginInfo(null, null);
                })
                .catch((res) => {
                    console.error(res)
                });
            }}
            >Logout</NavLink>} 
        </nav>
    )
}

export default NavigationBar;