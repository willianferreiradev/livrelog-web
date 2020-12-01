import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ContractsComponent } from './contracts/contracts.component';
import { FeesComponent } from './fees/fees.component';

const routes: Routes = [
  { path: 'contract', component: ContractsComponent },
  { path: 'fees', component: FeesComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
