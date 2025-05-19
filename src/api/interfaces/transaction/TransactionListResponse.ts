import { DefaultResponse } from "../DefaultResponse";
import { Transaction } from "./Transaction";

export interface TransactionListResponse extends DefaultResponse{
  transactions: Transaction[];
}