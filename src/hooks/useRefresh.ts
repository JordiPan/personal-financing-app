import { axiosDefault } from "../api/axios"
import { LoginResponse } from "../api/interfaces/login-register/LoginResponse";
import { useAuth } from "../context/AuthContext"
const useRefresh = () => {
    const {setToken} = useAuth();

    const refresh = async () => {
        //later in apibackendetc
        await axiosDefault.get<LoginResponse>('/auth/refresh', {
            withCredentials: true
        })
        .then((res) => {
            console.log("got refresh token!")
            const token = res.data.access_token;
            setToken(token);
            return token;
        })
        .catch((res) => {
            console.log("refresh error: ",res);
        })
    }
  return refresh;
}

export default useRefresh;