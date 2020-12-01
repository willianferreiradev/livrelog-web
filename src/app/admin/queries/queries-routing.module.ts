import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { MovesComponent } from './moves/moves.component';
import { TransportersComponent } from './transporters/transporters.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'transporters', component: TransportersComponent },
  { path: 'breakdowns', component: BreakdownsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }
