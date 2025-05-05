import { User } from '../models/User.ts'
export interface RegisterResponse {
    message: string;
    user: User;
  }