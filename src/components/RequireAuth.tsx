import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../api/interfaces/auth/CustomJwtPayload";
import { useState, useEffect } from "react";
const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { token } = useAuth();
  const location = useLocation();
  const [role, setRole] = useState(""); //basically global for logged in users to use
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        let decoded = jwtDecode(token) as CustomJwtPayload;
        setRole(decoded.role);
      } catch (error) {
        console.log(error);
        setRole("");
      }finally {setIsProcessing(false);}
    }
    else {setIsProcessing(false);}
  }, [token]);

  if(isProcessing) {
    return <>verifying...</>
  }
  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    console.log("Access denied, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
export default RequireAuth;
