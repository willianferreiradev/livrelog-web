import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { BudgetComponent } from './budget/budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBudgetsComponent } from './my-budgets/my-budgets.component';
import { MyChangesComponent } from './my-changes/my-changes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'request-budget', component: BudgetComponent },
  { path: 'my-budgets', component: MyBudgetsComponent },
  { path: 'my-changes', component: MyChangesComponent },
  { path: 'report-breakdowns', component: BreakdownsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
