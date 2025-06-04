import { DefaultResponse } from "../DefaultResponse";
import { FullInfoItem } from "./FullInfoItem";

export interface ItemsInCategoryResponse extends DefaultResponse{
  items: FullInfoItem[];
}