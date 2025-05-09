import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const GuestRoute = () => {
  const { setIsLoading } = useAuth();
  
  useEffect(() => {
    // Immediately set loading (getting refresh) to false for guest routes
    // Only reason this exists is because I don't like how it shows the default navbar with about page for a split second when refreshing
    // There should be a better way 
    setIsLoading(false);
  }, [setIsLoading]);
  
  return <Outlet />;
};

