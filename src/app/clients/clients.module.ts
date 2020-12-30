import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { BudgetComponent } from './budget/budget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, BudgetComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
