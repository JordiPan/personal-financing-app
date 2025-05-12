import { axiosDefault } from "./axios";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { RegisterResponse } from "./interfaces/login-register/RegisterResponse";
import { LoginResponse } from "./interfaces/login-register/LoginResponse";
import { RegisterRequest } from "./interfaces/login-register/RegisterRequest";
import { LoginRequest } from "./interfaces/login-register/LoginRequest";
import { User } from "./interfaces/user/User";
import { AxiosInstance } from "axios";

export const register = (data: RegisterRequest) => {
  const { fName, lName, ...rest } = data;
  return axiosDefault.post<RegisterResponse>("/auth/register", {
    first_name: fName,
    last_name: lName,
    ...rest
  });
};

export const login = async (data: LoginRequest) => {
  return axiosDefault.post<LoginResponse>("/auth/login", data, {
    withCredentials: true
  });
};

export const logout = async () => {
  return axiosDefault.post("/auth/logout", {}, {
    withCredentials: true
  });
};
//axios instance will always be of axiosprivate with the interceptors
export const getUserInfo = async (id: number, axios:AxiosInstance) => {
  return axios.get<User>(`/users/${id}`)
}
