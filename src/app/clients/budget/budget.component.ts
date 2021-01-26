import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from '@shared/helpers/BaseForm';
import { showToastError, showToastSuccess } from '@shared/helpers/toastr';
import { TitlePageService } from '@shared/services/title-page.service';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent extends BaseForm implements OnInit {
  numberBedroons = ['-- Selecione --', '01', '02', '03', '04', '05', '+ de 05'];
  images: string[] = [];
  showImages: string[] = [];

  constructor(
    private title: TitlePageService,
    private formBuilder: FormBuilder,
    private budget: BudgetService
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Socilitar orçamento para mudanças', breadcrumb: ['Home', 'Solicitar Orçamento'] });
    this.createForm();
  }


  createForm(): void {
    this.form = this.formBuilder.group({
      date: [null],
      inventory: [null, Validators.required],
      comments: [null],
      origin: this.getAddressForm(),
      destination: this.getAddressForm(),
      withdrawal: this.getCharacteristicForm('withdrawal'),
      delivery: this.getCharacteristicForm('delivery'),
    });
  }

  submit(): void {
    this.budget.create(this.formValue, this.images).subscribe(() => {
      showToastSuccess('Orçamento cadastrado!', 'Salvo!');
    });
  }

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
      has_elevator: [false],
      has_stairs: [false],
      has_parking: [false],
      is_time_restriction: [false],
      has_loading_unloading_area: [false],
      is_closed_condominium: [false],
      disassemble_furniture: [false],
      pack_furniture: [false],
      type: [type, Validators.required]
    });
  }

  upload(event): void {
    console.log(event.target.files[0]);

    if (event.target.files && event.target.files[0]) {

      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      // if (event.target.files[0].size > maxSize) {
      //   const maxSizeInMb = maxSize / 1000;
      //   showToastError(`Maximum size allowed is ${maxSizeInMb} Mb`, 'Erro!');
      //   return;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(event.target.files[0]);
        this.showImages.push(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
