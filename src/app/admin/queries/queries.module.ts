import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueriesRoutingModule } from './queries-routing.module';
import { UsersComponent } from './users/users.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { TransportersComponent } from './transporters/transporters.component';
import { MovesComponent } from './moves/moves.component';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    BudgetsComponent,
    TransportersComponent,
    MovesComponent,
    BreakdownsComponent
  ],
  imports: [
    CommonModule,
    QueriesRoutingModule,
    SharedModule
  ]
})
export class QueriesModule { }
