import { DefaultResponse } from "../DefaultResponse";
import { Category } from "./Category";

export interface CategoryListResponse extends DefaultResponse {
  categories: Category[]
}