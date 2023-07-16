import { AuthService } from 'src/app/services/auth/auth.service';
import { RequestLogin } from './../../models/RequestLogin';

import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  requestLogin: RequestLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.requestLogin).subscribe({
      next: (data) => {
        localStorage.setItem('mywallet-token', JSON.stringify(data.token));
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        if (error.status === 403) {
          this.alertService.error('Email e/ou senha incorretos!');
        } else {
          this.alertService.error('Erro na requisição!');
        }
      },
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/cadastro']);
  }
}
