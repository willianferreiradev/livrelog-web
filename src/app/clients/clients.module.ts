import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { BudgetComponent } from './budget/budget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MyBudgetsComponent } from './my-budgets/my-budgets.component';
import { MyChangesComponent } from './my-changes/my-changes.component';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardComponent,
    BudgetComponent,
    MyBudgetsComponent,
    MyChangesComponent,
    BreakdownsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgbDropdownModule,
    NgbModalModule
  ]
})
export class ClientsModule { }
