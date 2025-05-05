import { useEffect } from "react";
import "../../../css/home.css";
// import { useLocation } from "react-router-dom";
// import { RegisterResponse } from "../../../api/response-interfaces/RegisterResponse";
function UserHome() {
    // const location = useLocation();
  // const message: RegisterResponse = location.state || null;
  useEffect(() => {
    document.title = "User home";
  });

  return <>res: {}</>;
}

export default UserHome;
