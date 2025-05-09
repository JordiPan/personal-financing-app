import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useRefresh from "../hooks/useRefresh";
import Loading from "./Loading";

//gets called when on page with authorization needed
const PersistLogin = () => {
  const { token, isLoading, setIsLoading } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      await refresh()
        .catch((res) => {
          console.log("refresh error: ", res);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
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
