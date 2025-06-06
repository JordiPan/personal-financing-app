import { useEffect, useState } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
import { LatestTransactions } from "./sub-components/LatestTransactions";
import { MonthlyOverview } from "./sub-components/MonthlyOverview";
function Dashboard() {
  const {token} = useAuth();
  
  useEffect(() => {
    document.title = "Dashboard";
  });

  return <>
  Here is the dashboard with fun graphs!!!! WIP
  <LatestTransactions/>
  <MonthlyOverview/>
  </>;
}

export default Dashboard;
