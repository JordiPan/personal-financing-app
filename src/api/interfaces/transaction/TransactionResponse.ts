import { DefaultResponse } from "../DefaultResponse";
import { Transaction } from "./Transaction";

export interface TransactionResponse extends DefaultResponse{
  transaction: Transaction;
}