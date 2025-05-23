import { Item } from "../item/Item";
import { Transaction } from "./Transaction";

export interface NewTransactionRequest extends Omit<Transaction, 'id'> {
  items: Item[];
}