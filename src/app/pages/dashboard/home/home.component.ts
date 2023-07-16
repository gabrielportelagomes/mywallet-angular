import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FinancialRecord,
  FinancialRecordFormated,
} from 'src/app/models/FinancialRecord';
import { FinancialRecordService } from 'src/app/services/financial-record/financial-record.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  financialRecords: FinancialRecord[] = [];
  financialRecordFormated: FinancialRecordFormated[] = [];
  total: number = 0;
  totalFormated: string = '';

  constructor(
    private router: Router,
    private financialRecordService: FinancialRecordService
  ) {
    this.getFinancialRecords();
  }

  ngOnInit(): void {}

  getFinancialRecords(): void {
    this.financialRecordService.getFinancialRecords().subscribe((records) => {
      this.financialRecords = records.map((record) => ({
        ...record,
        createdAt: format(new Date(record.createdAt), 'dd/MM'),
      }));
      this.calculateTotal();
      this.financialRecordFormated = this.financialRecords.map((record) => ({
        ...record,
        value: this.convertValue(record.value),
      }));
    });
  }

  calculateTotal(): void {
    this.total = 0;
    this.financialRecords.forEach((record) => {
      if (record.category === 'INCOME') {
        this.total += record.value;
      } else if (record.category === 'EXPENSE') {
        this.total -= record.value;
      }
    });
    this.totalFormated = this.convertValue(this.total);
  }

  convertValue(value: number): string {
    const formattedValue = (value / 100).toFixed(2);
    return formattedValue.replace('.', ',');
  }

  goToIncome() {
    this.router.navigate(['/dashboard/entrada']);
  }

  goToExpense() {
    this.router.navigate(['/dashboard/saida']);
  }

  exit() {
    localStorage.removeItem('mywallet-token');
    this.router.navigate(['']);
  }
}
