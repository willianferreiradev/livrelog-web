import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { InformationBoxComponent } from './components/information-box/information-box.component';
import { RouterModule } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent,
    DatatableComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent,
    DatatableComponent
  ]
})
export class SharedModule { }
