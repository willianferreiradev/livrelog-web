import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'request-budget', component: BudgetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
