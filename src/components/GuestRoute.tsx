import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const GuestRoute = () => {
  return <Outlet />;
};

