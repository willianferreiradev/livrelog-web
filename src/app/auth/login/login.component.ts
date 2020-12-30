import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { BaseForm } from '@shared/helpers/BaseForm';
import { TypeUser } from '@enums/TypeUser';
import { AuthenticationService } from '@services/authentication.service';
import { showToastError } from '@shared/helpers/toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseForm implements OnInit, OnDestroy {
  siteUrl: string = environment.site;
  labelByTypeUser: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authentication: AuthenticationService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.document.body.style.background = '#12214a';
    this.createForm();
    this.route.queryParams.subscribe(params => {
      if (!params.type) {
        return this.router.navigate([], { relativeTo: this.route, queryParams: { type: TypeUser.CLIENT } });
      }
      this.form.get('type_user').patchValue(params.type);
      this.labelByTypeUser = this.getLabelByTypeUser(params.type);
    });
  }

  ngOnDestroy(): void {
    this.document.body.style.background = '#fff';
  }

  submit(): void {
    this.form.get('cpf_cnpj').patchValue(this.formValue.email);
    this.authentication.login(this.formValue).subscribe(
      () => this.router.navigate(['admin', 'dashboard']),
      () => showToastError('Erro ao fazer login. Tente novamente', 'Erro!')
    );
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      cpf_cnpj: [null],
      email: [null],
      password: [null, Validators.required],
      remember_me: [true, Validators.required],
      type_user: [null, Validators.required]
    });
  }

  getLabelByTypeUser(typeUser): string {
    if (typeUser === TypeUser.ADMIN || typeUser === TypeUser.CLIENT) {
      return 'Digite seu email';
    }

    if (typeUser === TypeUser.TRANSPORTER) {
      return 'Digite seu CNPJ';
    }

    if (typeUser === TypeUser.DRIVER) {
      return 'Digite seu CPF';
    }
  }
}
