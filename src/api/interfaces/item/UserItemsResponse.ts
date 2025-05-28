import { DefaultResponse } from "../DefaultResponse";
import { Item } from "./Item";

export interface UserItemsResponse extends DefaultResponse {
  items: Item[];
}