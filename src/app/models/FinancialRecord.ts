export interface FinancialRecord {
  id: string;
  value: number;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialRecordFormated {
  id: string;
  value: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
