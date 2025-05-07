import { axiosDefault } from "../api/axios"
import { LoginResponse } from "../api/response-interfaces/LoginResponse";
import { useAuth } from "../context/AuthContext"
const useRefresh = () => {
    const {setLoginInfo, role, token} = useAuth();

    const refresh = async () => {
        //later in apibackendetc
        await axiosDefault.get('/auth/refresh', {
            withCredentials: true
        })
        .then((res) => {
            console.log("it work??:",res)
            const roles = res.data.role;
            const access_token = res.data.access_token;
            setLoginInfo(roles, access_token);
            return access_token;
        })
        .catch((res) => {
            console.log("refresh error: ",res);
        })
    }
  return refresh;
}

export default useRefresh