import { useEffect } from "react";
import "../../../css/home.css";
import { useLocation } from "react-router-dom";
function UserHome() {
    const location = useLocation();
  const message: string = location.state || {};
  useEffect(() => {
    document.title = "Home";
  });

  return <>{message}</>;
}

export default UserHome;
