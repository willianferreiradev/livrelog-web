import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { JwtInterceptor } from '@interceptors/jwt.interceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileComponent } from './profile/profile.component';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
