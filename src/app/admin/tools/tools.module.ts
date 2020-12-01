import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import { FeesComponent } from './fees/fees.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [ContractsComponent, FeesComponent, AdminComponent],
  imports: [
    CommonModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
