import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { InformationBoxComponent } from './components/information-box/information-box.component';
import { RouterModule } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToModalComponent } from './components/text-to-modal/text-to-modal.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent,
    DatatableComponent,
    TextToModalComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    InformationBoxComponent,
    DatatableComponent,
    TextToModalComponent
  ]
})
export class SharedModule { }
