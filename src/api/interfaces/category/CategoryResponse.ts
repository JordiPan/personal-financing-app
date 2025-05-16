import { DefaultResponse } from "../DefaultResponse";
import { Category } from "./Category";
//used in update and create
export interface CategoryResponse extends DefaultResponse{
  category: Category;
}
