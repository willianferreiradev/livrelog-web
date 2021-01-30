import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseForm } from '@shared/helpers/BaseForm';
import { AuthenticationService } from '@shared/services/authentication.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends BaseForm implements OnInit {
  type = 'client';
  @ViewChild('content') contentRef: ElementRef;
  siteUrl: string = environment.site;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.document.body.style.background = '#12214a';
    this.createForm();
    this.route.queryParams.subscribe(({ type }) => {
      this.reset();
      this.form.get('type').patchValue(type ?? 'client');
    });
  }

  submit(): void {
    this.service.signin(this.formValue).subscribe(() => {
      this.modal.open(this.contentRef).result.then(() => this.router.navigate(['auth', 'login']));
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      phone: [null, Validators.required],
      cpf_cnpj: [null, Validators.required],
      type: [this.type, Validators.required],
      transporter: this.formBuilder.group({
        name: [null],
        phone: [null],
        responsible: [null],
      })
    });
  }
}
