import { Item } from "../item/Item";
//only used in the making of a transaction
export interface ExistingTransactionItem extends Item {
  quantity: number;
}
