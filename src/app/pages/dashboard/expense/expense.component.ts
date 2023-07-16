import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestFinancialRecord } from 'src/app/models/RequestFinancialRecord';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FinancialRecordService } from 'src/app/services/financial-record/financial-record.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  requestExpense: RequestFinancialRecord = {
    value: '',
    description: '',
    category: 'EXPENSE',
  };

  constructor(
    private financialRecordService: FinancialRecordService,
    private alertService: AlertService,
    private router: Router
  ) {}

  convertValue(event: Event) {
    let newValue = (event.target as HTMLInputElement).value;
    newValue = newValue.replace(/\D/g, '');
    newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2');
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
    this.requestExpense.value = newValue;
  }

  postIncome() {
    if (typeof this.requestExpense.value === 'string') {
      this.requestExpense.value =
        parseInt(this.requestExpense.value.replace(/[^\d]+/g, ''));
    }

    this.financialRecordService.postFinancialRecord(this.requestExpense).subscribe({
      next: (data) => {
        this.router.navigate(['dashboard/home']);
      },
      error: (error) => {
        if (error.error.category) {
          this.alertService.error(error.error.category);
        } else if (error.error.value) {
          this.alertService.error(error.error.value);
        } else if (error.error.description) {
          this.alertService.error(error.error.description);
        } else {
          this.alertService.error('Erro na requisição!');
        }

        if (
          typeof this.requestExpense.value === 'number' &&
          isNaN(this.requestExpense.value)
        ) {
          this.requestExpense.value = '';
        }
      },
    });
  }

  navigateToHome() {
    this.router.navigate(['/dashboard/home']);
  }
}
