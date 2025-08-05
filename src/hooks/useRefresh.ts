import { axiosDefault } from "../api/axios";
import { LoginResponse } from "../api/interfaces/login-register/LoginResponse";
import { useAuth } from "../context/AuthContext";
const useRefresh = () => {
  const { setToken, setIsLoading } = useAuth();

  const refresh = async () => {
    //later in apibackendetc
    return await axiosDefault
      .get<LoginResponse>("/auth/refresh", {
        withCredentials: true,
        timeout: 1500
      }, )
      .then((res) => {
        const token = res?.data?.access_token;
        setToken(token);
        setIsLoading(false);
        return token;
      })
      .catch(() => {
        // console.log("error: ", res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return refresh;
};

export default useRefresh;
