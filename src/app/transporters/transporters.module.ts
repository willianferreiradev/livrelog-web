import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportersRoutingModule } from './transporters-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { MovesComponent } from './moves/moves.component';
import { BreakdownsComponent } from './breakdowns/breakdowns.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { NgSwitcheryModule } from 'angular-switchery-ios';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    DashboardComponent,
    BudgetsComponent,
    MovesComponent,
    BreakdownsComponent,
    VehiclesComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    TransportersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgbModalModule,
    CurrencyMaskModule,
    NgSwitcheryModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }]
})
export class TransportersModule { }
