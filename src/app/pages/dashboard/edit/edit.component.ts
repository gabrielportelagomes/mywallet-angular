import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialRecord } from 'src/app/models/FinancialRecord';
import { RequestFinancialRecord, RequestUpdateFinancialRecord } from 'src/app/models/RequestFinancialRecord';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FinancialRecordService } from 'src/app/services/financial-record/financial-record.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  requestRecord: RequestUpdateFinancialRecord = {
    value: '',
    description: '',
  };

  constructor(
    private financialRecordService: FinancialRecordService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRecordData();
  }

  loadRecordData(): void {
    const record: RequestUpdateFinancialRecord = history.state.record;
    if (record) {
      this.requestRecord = {
        value: record.value.toString(),
        description: record.description,
      };
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }

  convertValue(event: Event) {
    let newValue = (event.target as HTMLInputElement).value;
    newValue = newValue.replace(/\D/g, '');
    newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2');
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
    this.requestRecord.value = newValue;
  }

  putRecord() {
    if (typeof this.requestRecord.value === 'string') {
      this.requestRecord.value = parseInt(
        this.requestRecord.value.replace(/[^\d]+/g, '')
      );
    }

    this.financialRecordService
      .putFinancialRecord(this.requestRecord, history.state.record.id)
      .subscribe({
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
            typeof this.requestRecord.value === 'number' &&
            isNaN(this.requestRecord.value)
          ) {
            this.requestRecord.value = '';
          }
        },
      });
  }

  navigateToHome() {
    const confirm = window.confirm(
      'As alterações serão perdidas, deseja voltar?'
    );

    if (confirm) {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
