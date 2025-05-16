import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefresh from "./useRefresh";
import { useAuth } from "../context/AuthContext";

export const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { token } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      //no problem response
      (response) => response,

      //access token expired or other intercepted problem
      //does prev request again when getting new token
      async (error) => {
        const prev = error?.config;
        if (error?.response?.status === 401 && !prev?.sent) {
          prev.sent = true;
          const newAccessToken = await refresh();
          prev.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prev);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);
  return axiosPrivate;
};
