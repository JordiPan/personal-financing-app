import { DefaultResponse } from "../DefaultResponse";
import { Item } from "./Item";


export interface ItemsInCategoryResponse extends DefaultResponse{
  items: Item[];
}