import { useEffect } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
function UserHome() {
  const {role, token} = useAuth();

  useEffect(() => {
    document.title = "User home";
  });

  return <>result: {role} | {token}</>;
}

export default UserHome;
