import { axiosDefault } from "../api/axios"
import { LoginResponse } from "../api/interfaces/login-register/LoginResponse";
import { useAuth } from "../context/AuthContext"
const useRefresh = () => {
    const {setLoginInfo} = useAuth();

    const refresh = async () => {
        //later in apibackendetc
        await axiosDefault.get<LoginResponse>('/auth/refresh', {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data.message)
            const role = res.data.role;
            const access_token = res.data.access_token;
            setLoginInfo(role, access_token);
            return access_token;
        })
        .catch((res) => {
            console.log("refresh error: ",res);
        })
    }
  return refresh;
}

export default useRefresh