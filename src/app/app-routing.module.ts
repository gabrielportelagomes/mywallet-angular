import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { IncomeComponent } from './pages/dashboard/income/income.component';
import { ExpenseComponent } from './pages/dashboard/expense/expense.component';
import { HomeComponent } from './pages/dashboard/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: SignUpComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
