import { axiosDefault } from "./axios";
import { RegisterResponse } from "./interfaces/login-register/RegisterResponse";
import { LoginResponse } from "./interfaces/login-register/LoginResponse";
import { RegisterRequest } from "./interfaces/login-register/RegisterRequest";
import { LoginRequest } from "./interfaces/login-register/LoginRequest";
import { User } from "./interfaces/user/User";
import { AxiosInstance } from "axios";
import { UserUpdateResponse } from "./interfaces/user/UserUpdateResponse";

//add try catch inside these functions instead of in the implementation!!!
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
export const deleteUser = async (id: number, axios:AxiosInstance) => {
  return axios.delete<User>(`/users/${id}`)
}

export const updateUser = (id: number, user: User, axios:AxiosInstance) => {
  return axios.put<UserUpdateResponse>(`/users/${id}`, user);
};