import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { MovesComponent } from './moves/moves.component';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'breakdowns', component: BreakdownsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportersRoutingModule { }
