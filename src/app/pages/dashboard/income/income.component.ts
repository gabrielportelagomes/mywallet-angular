import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestFinancialRecord } from 'src/app/models/RequestFinancialRecord';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FinancialRecordService } from 'src/app/services/financial-record/financial-record.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent {
  requestIncome: RequestFinancialRecord = {
    value: '',
    description: '',
    category: 'INCOME',
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
    this.requestIncome.value = newValue;
  }

  postIncome() {
    if (typeof this.requestIncome.value === 'string') {
      this.requestIncome.value =
        parseInt(this.requestIncome.value.replace(/[^\d]+/g, '')) / 100;
    }

    this.financialRecordService.postFinancialRecord(this.requestIncome).subscribe({
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
          typeof this.requestIncome.value === 'number' &&
          isNaN(this.requestIncome.value)
        ) {
          this.requestIncome.value = '';
        }
      },
    });
  }

  navigateToHome() {
    this.router.navigate(['/dashboard/home']);
  }
}
