import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RequestFinancialRecord, RequestUpdateFinancialRecord } from 'src/app/models/RequestFinancialRecord';
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

  deleteFinancialRecord(id: string): Observable<any> {
    return this.httpClient.delete(
      this.apiService.getBaseUrl().concat(`/records/${id}`),
      { headers: this.apiService.getHeadersWithToken() }
    );
  }

  putFinancialRecord(requestFinancialRecord: RequestUpdateFinancialRecord, id: string): Observable<any> {
    return this.httpClient.put(
      this.apiService.getBaseUrl().concat(`/records/${id}`),
      requestFinancialRecord,
      { headers: this.apiService.getHeadersWithToken() }
    );
  }
}
