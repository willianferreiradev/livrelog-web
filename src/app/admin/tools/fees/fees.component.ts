import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseForm } from '@shared/helpers/BaseForm';
import { showToastSuccess } from '@shared/helpers/toastr';
import { TitlePageService } from '@shared/services/title-page.service';
import { FeesService } from './fees.service';
@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent extends BaseForm implements OnInit {
  fee: any;

  constructor(
    private titleService: TitlePageService,
    private feesService: FeesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.titleSubject.next({
      title: `Cadastro de taxa de comissão da plataforma`,
      breadcrumb: ['Home', 'Ferramentas', 'Taxas']
    });

    this.createForm();
    this.getFee();
  }

  openModal(content): void {
    this.modalService.open(content);
  }

  submit(): void {
    this.feesService.update(this.formValue.fee).subscribe(() => {
      showToastSuccess('Taxa atualizada', 'Salvo!');
      this.modalService.dismissAll();
      this.getFee();
    });
  }

  private getFee(): void {
    this.feesService.index().subscribe(fee => {
      this.fee = fee;
      this.form.get('fee').patchValue(fee.fee);
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fee: [Validators.required]
    });
  }
}
