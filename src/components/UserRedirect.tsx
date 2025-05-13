import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
// import { customjwtDecoder } from "../api/CustomJwtDecoder";

//redirects when user logged in and wants to visit guest pages
export const UserRedirect = () => {
  const { token } = useAuth();
  
  if (token) {
    // let decoded =  customjwtDecoder(token);

    // if(decoded?.role === 'admin') {
    //   <Navigate to="/admin-home" replace />;
    // }
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
