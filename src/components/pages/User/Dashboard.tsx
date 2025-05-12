import { useEffect } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
function Dashboard() {
  const {token} = useAuth();

  useEffect(() => {
    document.title = "User home";
  });

  return <>result: {token}</>;
}

export default Dashboard;
