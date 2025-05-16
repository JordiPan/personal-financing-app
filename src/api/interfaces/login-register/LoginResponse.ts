import { DefaultResponse } from "../DefaultResponse";

// import { User } from '../models/User.ts'
export interface LoginResponse extends DefaultResponse{
    access_token: string;
  }