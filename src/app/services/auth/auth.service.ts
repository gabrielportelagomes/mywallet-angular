import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from 'src/app/models/RequestLogin';
import { ResponseLogin } from 'src/app/models/ResponseLogin';
import { ApiService } from '../api/api.service';
import { RequestSignUp } from 'src/app/models/RequestSignUp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  login(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(
      this.apiService.getBaseUrl().concat('/auth/sign-in'),
      requestLogin,
      { headers: this.apiService.getHeaders() }
    );
  }

  signUp(requestSignUp: RequestSignUp): Observable<any> {
    return this.httpClient.post(
      this.apiService.getBaseUrl().concat('/auth/sign-up'),
      requestSignUp,
      { headers: this.apiService.getHeaders() }
    );
  }
}
