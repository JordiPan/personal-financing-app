import { Item } from "../item/Item";
//only used in the making of a transaction
export interface NewTransactionItem extends Omit<Item, "id">{
  quantity: number;
}
