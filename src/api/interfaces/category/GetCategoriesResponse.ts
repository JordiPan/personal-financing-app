import { DefaultResponse } from "../DefaultResponse";
import { Category } from "./Category";

export interface GetCategoriesResponse extends DefaultResponse {
  categories: Category[]
}