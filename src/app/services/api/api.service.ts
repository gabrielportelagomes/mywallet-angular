import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:8080/api';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor() {}

  getBaseUrl() {
    return this.baseUrl;
  }

  getHeaders() {
    return this.headers;
  }

  getHeadersWithToken() {
    const token = this.getToken();
    if (token) {
      return this.headers.append('Authorization', 'Bearer ' + token);
    } else {
      return this.headers;
    }
  }

  getToken() {
    const token = localStorage.getItem('mywallet-token');
    if (token) {
      return JSON.parse(token);
    } else {
      return undefined;
    }
  }
}
