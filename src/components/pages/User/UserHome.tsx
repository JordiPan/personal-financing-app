import { useEffect } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
function UserHome() {
  const {user, token} = useAuth();

  useEffect(() => {
    document.title = "User home";
  });

  return <>result: {user?.id} {user?.role} | {token}</>;
}

export default UserHome;
