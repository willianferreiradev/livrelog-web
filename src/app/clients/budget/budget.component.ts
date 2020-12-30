import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from '@shared/helpers/BaseForm';
import { TitlePageService } from '@shared/services/title-page.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent extends BaseForm implements OnInit {

  constructor(
    private title: TitlePageService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Socilitar orçamento para mudanças', breadcrumb: ['Home', 'Solicitar Orçamento'] });
  }


  createForm(): void {
    this.form = this.formBuilder.group({
      date: [],
      origin: this.getAddressForm(),
      destination: this.getAddressForm(),
      withdrawal: this.getCharacteristicForm('withdrawal'),
      delivery: this.getCharacteristicForm('delivery'),
    });
  }

  submit(): void { }

  private getAddressForm(): FormGroup {
    return this.formBuilder.group({
      cep: [null, Validators.required],
      street: [null],
      complement: [null],
      neighborhood: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      number: [null, Validators.required]
    });
  }

  private getCharacteristicForm(type: string): FormGroup {
    return this.formBuilder.group({
      type_building: [null, Validators.required],
      number_bedroom: [null, Validators.required],
      has_elevator: [null, Validators.required],
      has_stairs: [null, Validators.required],
      is_time_restriction: [null, Validators.required],
      is_closed_condominium: [null, Validators.required],
      disassemble_furniture: [null, Validators.required],
      pack_furniture: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

}
