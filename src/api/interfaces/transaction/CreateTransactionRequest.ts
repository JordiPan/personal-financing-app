import { ExistingTransactionItem } from "./ExistingTransactionItem";
import { NewTransactionItem } from "./NewTransactionItem";
import { Transaction } from "./Transaction";

export interface CreateTransactionRequest extends Omit<Transaction, 'id'> {
  existingItems: ExistingTransactionItem[];
  newItems: NewTransactionItem[];
}