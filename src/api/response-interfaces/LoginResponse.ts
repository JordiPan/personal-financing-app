// import { User } from '../models/User.ts'
export interface LoginResponse {
    message: string;
    // user: User;
    access_token: string;
    role: string;
  }