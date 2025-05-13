import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useRefresh from "../hooks/useRefresh";
import Loading from "./Loading";

//gets called when on page to check accesstoken needed
const PersistLogin = () => {
  const { token, isLoading } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh()
        .catch((res) => {
          console.log("refresh error: ", res);
        })
    };
    if(!token) {
      verifyRefreshToken()
    }
  }, [refresh, token]);

  return (
    <Loading isLoading={isLoading}>
      <Outlet />
    </Loading>
  );
};
export default PersistLogin;
