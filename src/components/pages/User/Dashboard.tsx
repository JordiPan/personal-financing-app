import { useEffect } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
function Dashboard() {
  const {token} = useAuth();

  useEffect(() => {
    document.title = "Dashboard";
  });

  return <>Here is the dashboard with fun graphs!!!! WIP</>;
}

export default Dashboard;
