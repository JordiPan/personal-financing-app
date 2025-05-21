import { useEffect, useState } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
import { LatestTransactions } from "./sub-components/LatestTransactions";
function Dashboard() {
  const {token} = useAuth();
  
  useEffect(() => {
    document.title = "Dashboard";
  });

  return <>
  Here is the dashboard with fun graphs!!!! WIP
  <LatestTransactions/>
  </>;
}

export default Dashboard;
