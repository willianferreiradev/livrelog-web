import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '',  redirectTo: 'auth', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'transporters', loadChildren: () => import('./transporters/transporters.module').then(m => m.TransportersModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '',  redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
