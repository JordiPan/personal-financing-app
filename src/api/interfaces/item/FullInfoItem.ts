import { Country } from "../country/Country";
import { Item } from "./Item";

export interface FullInfoItem extends Item {
  country: Country;
  img_link: string;
  card_api_id: number;
}