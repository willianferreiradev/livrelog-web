import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportersRoutingModule } from './transporters-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { MovesComponent } from './moves/moves.component';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';


@NgModule({
  declarations: [DashboardComponent, BudgetsComponent, MovesComponent, BreakdownsComponent, VehiclesComponent, DriversComponent],
  imports: [
    CommonModule,
    TransportersRoutingModule
  ]
})
export class TransportersModule { }
