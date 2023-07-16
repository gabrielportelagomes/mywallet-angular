import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RequestFinancialRecord } from 'src/app/models/RequestFinancialRecord';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  postFinancialRecord(requestFinancialRecord: RequestFinancialRecord): Observable<any> {
    return this.httpClient.post(
      this.apiService.getBaseUrl().concat('/records'),
      requestFinancialRecord,
      { headers: this.apiService.getHeadersWithToken() }
    );
  }
}
