import { axiosDefault } from "./axios";
import { axiosPrivate } from "./axios";
import { RegisterResponse } from "./response-interfaces/RegisterResponse";
export const register = (data: {
  fName: string,
  lName: string,
  birthdate: string,
  email: string,
  password: string
}) => {
  const { fName, lName, ...rest } = data;
  return axiosPrivate.post<RegisterResponse>("/auth/register", {
    first_name: data.fName,
    last_name: data.lName,
    ...rest
  });
};
