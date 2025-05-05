import { useEffect } from "react";
import "../../../css/home.css";
import { useLocation } from "react-router-dom";
import { LoginResponse } from "../../../api/response-interfaces/LoginResponse";
function UserHome() {
    const location = useLocation();
  const message: LoginResponse = location.state || null;
  useEffect(() => {
    document.title = "User home";
  });

  return <>result: {message.token}</>;
}

export default UserHome;
