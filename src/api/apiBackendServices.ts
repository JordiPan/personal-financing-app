import axios from "./axios";
import axiosPrivate from "./axios";
export const register = (data: { fName:string, lName:string, birthdate:Date, email:string, password:string }) => { axiosPrivate.post('/user', data)}