import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RequestFinancialRecord } from 'src/app/models/RequestFinancialRecord';
import { Observable } from 'rxjs';
import { FinancialRecord } from 'src/app/models/FinancialRecord';

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

  getFinancialRecords(): Observable<FinancialRecord[]> {
    return this.httpClient.get<FinancialRecord[]>(
      this.apiService.getBaseUrl().concat('/records'),
      { headers: this.apiService.getHeadersWithToken() }
    );
  }
}
