import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import { FeesComponent } from './fees/fees.component';
import { AdminComponent } from './admin/admin.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContractsComponent,
    FeesComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class ToolsModule { }
