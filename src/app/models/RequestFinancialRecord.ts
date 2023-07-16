export interface RequestFinancialRecord {
  value: number | string;
  description: string;
  category: string;
}

export interface RequestUpdateFinancialRecord {
  value: number | string;
  description: string;
}
