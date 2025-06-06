import { DefaultResponse } from "../DefaultResponse";
import { Transaction } from "./Transaction";

export interface MonthlyTransactionsResponse extends DefaultResponse {
  income: Transaction[];
  expenses: Transaction[];
}