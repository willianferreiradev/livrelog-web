import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BaseForm } from '../../shared/helpers/BaseForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseForm implements OnInit, OnDestroy {
  siteUrl: string = environment.site;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    // private auth: Authe
  ) {
    super();
  }

  ngOnInit(): void {
    this.document.body.style.background = '#12214a';
    this.createForm();
    this.route.queryParams.subscribe(params =>
      this.form.get('type_user').patchValue(params.type ?? 'client')
    );
  }

  ngOnDestroy(): void {
    this.document.body.style.background = '#fff';
  }

  submit(): void {
    // this.auth.login(this.formValue.email, this.formValue.password, 'client')
    //   .then(success => console.log(success))
    //   .catch(error => console.log(error));
    // console.log('vamos lá');
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
}
