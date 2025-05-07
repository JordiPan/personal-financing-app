import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useRefresh from "../hooks/useRefresh";
import Loading from "./Loading";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      // refresh()
      // .then(()=>{
      //     console.log("persist login refresh worked!")
      // })
      // .catch((res) => {
      //     console.log("refresh error: ",res);
      // })
      // .finally(()=> {
      //     setIsLoading(false);
      // })
      try {
        // Properly await the refresh call
        await refresh();
        console.log("persist login refresh worked!");
      } catch (err) {
        console.log("refresh error: ", err);
      } finally {
        // Only update state if component is still mounted
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [refresh, token]);

  return (
    <Loading isLoading={isLoading}>
      <Outlet />
    </Loading>
  );
};
export default PersistLogin;
