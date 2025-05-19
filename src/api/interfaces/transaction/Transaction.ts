export interface Transaction {
  name: string;
  description: string;
  recurrence: string;
  date: string;
  is_item: boolean;
  total: number;
  active: boolean;
}