import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  { path: 'home', component: TesteComponent },
  { path: '',  redirectTo: 'auth', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
