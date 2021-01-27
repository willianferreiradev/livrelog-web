import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BaseForm } from '@shared/helpers/BaseForm';
import { showToastSuccess } from '@shared/helpers/toastr';
import { AuthenticationService } from '@shared/services/authentication.service';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseForm implements OnInit {
  image: any = null;
  imageToServer = null;
  storageLink = `${environment.storage}users/`;
  typeUser: string;

  constructor(
    private title: TitlePageService,
    private formBuilder: FormBuilder,
    private service: ProfileService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Meus dados', breadcrumb: ['Meus dados'] });
    this.createForm();
    this.typeUser = this.auth.currentUserValue.type;
    this.activatedRoute.queryParams.pipe(switchMap(({id}) => this.service.findById(id)))
      .subscribe(user => {
        this.image = `${this.storageLink}${user.id}.png`;
        this.form.patchValue(user);
      });
  }

  submit(): void {
    this.service.update(this.formValue, this.imageToServer).subscribe(e => {
      showToastSuccess('Usuário atualizado', 'Salvo');
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      cpf_cnpj: [null, Validators.required],
      phone: [null, Validators.required],
      type: [null],
    });
  }

  upload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
        this.imageToServer = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onError(event: any): void {
    event.target.src = 'assets/images/users/no-user.jpg';
  }
}
