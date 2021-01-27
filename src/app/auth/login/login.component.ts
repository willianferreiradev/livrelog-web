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
  loginByTypeUser: string;
  dynamicMask = '';

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
    this.route.queryParams.subscribe(({type}) => {
      this.reset();
      if (!type) {
        return this.router.navigate([], { relativeTo: this.route, queryParams: { type: TypeUser.CLIENT } });
      }
      this.form.get('type_user').patchValue(type);
      this.loginByTypeUser = this.getLoginByTypeUser(type);
      this.labelByTypeUser = this.getLabelByTypeUser(type);
      this.dynamicMask = this.getDynamicMask(type);
    });
  }

  ngOnDestroy(): void {
    this.document.body.style.background = '#fff';
  }

  submit(): void {
    this.form.get('cpf_cnpj').patchValue(this.formValue.email);
    this.authentication.login(this.formValue).subscribe(
      (user) => this.router.navigate([user.type === 'admin' ? 'admin' : `${user.type}s`, 'dashboard']),
      () => showToastError('Erro ao fazer login. Tente novamente', 'Erro!')
    );
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      cpf_cnpj: [null],
      email: [null],
      password: [null, Validators.required],
      remember_me: [true],
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

  getDynamicMask(typeUser): string {
    if (typeUser === TypeUser.ADMIN || typeUser === TypeUser.CLIENT) {
      return '';
    }

    if (typeUser === TypeUser.TRANSPORTER) {
      return '00.000.000/0000-00';
    }

    if (typeUser === TypeUser.DRIVER) {
      return '000.000.000-00';
    }
  }

  private getLoginByTypeUser(type: string): string {
    const types = {
      admin: 'Admin',
      client: 'Cliente',
      transporter: 'Transportadora'
    };

    return types[type];
  }

}
