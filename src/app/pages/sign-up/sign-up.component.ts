import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestSignUp } from 'src/app/models/RequestSignUp';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  requestSignUp: RequestSignUp = {
    name: '',
    email: '',
    password: '',
    role: 'USER',
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  signUp() {
    this.authService.signUp(this.requestSignUp).subscribe({
      next: (data) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.email) {
          this.alertService.error(error.error.email);
        } else if (error.error.password) {
          this.alertService.error(error.error.password);
        } else if (error.error.name) {
          this.alertService.error(error.error.name);
        } else {
          this.alertService.error('Erro ao fazer o cadastro!');
        }
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
