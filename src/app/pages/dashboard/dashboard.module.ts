import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeComponent,
    ExpenseComponent,
    HomeComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    MatIconModule
  ]
})
export class DashboardModule { }
