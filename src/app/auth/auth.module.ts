import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NgxMaskModule } from 'ngx-mask';
import { CreateAccountComponent } from './create-account/create-account.component';


@NgModule({
  declarations: [LoginComponent, LogoutComponent, CreateAccountComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule
  ]
})
export class AuthModule { }
