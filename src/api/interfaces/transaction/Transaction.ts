export interface Transaction {
  id: number;
  name: string;
  description: string;
  recurrence: string;
  date: string;
  total: number;
  active: boolean;
}