import { User } from '../models/User.ts'
export interface LoginResponse {
    message: string;
    user: User;
    token: string;
  }