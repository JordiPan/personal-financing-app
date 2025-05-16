import { DefaultResponse } from "../DefaultResponse";
import { User } from "./User";

export interface UserInfoResponse extends DefaultResponse {
  user: User;
}