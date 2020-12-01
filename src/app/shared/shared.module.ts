import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { InformationBoxComponent } from './components/information-box/information-box.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent
  ]
})
export class SharedModule { }
