import { useEffect, useState } from "react";
import "../../../css/home.css";
import { useAuth } from "../../../context/AuthContext";
import { LatestTransactions } from "./sub-components/LatestTransactions";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { Transaction } from "../../../api/interfaces/transaction/Transaction";
function Dashboard() {
  const {token} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    document.title = "Dashboard";
  });

  return <>
  Here is the dashboard with fun graphs!!!! WIP
  <LatestTransactions axiosPrivate={axiosPrivate}/>
  </>;
}

export default Dashboard;
