import { Category } from "../category/Category";
import { Country } from "../country/Country";
import { DefaultResponse } from "../DefaultResponse";

export interface CountriesAndCategoriesResponse extends DefaultResponse{
  'countries': Country[];
  'categories': Omit<Category, 'description'>[];
}