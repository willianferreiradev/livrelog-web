import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { BaseForm } from '@shared/helpers/BaseForm';
import { showToastSuccess } from '@shared/helpers/toastr';
import { DatatableData } from '@shared/models/Datatable';
import { AuthenticationService } from '@shared/services/authentication.service';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { DriverService } from './driver.service';
import columns from './driver.columns';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent extends BaseForm implements OnInit {
  images = [];
  imagesToServer = [];
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';

  constructor(
    private title: TitlePageService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private service: DriverService,
    private route: ActivatedRoute,
    private datatableService: DatatableService<any>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Motoristas', breadcrumb: ['Home', 'Motoristas'] });
    this.createForm();
    this.getAll();
  }

  getAll(): void {
    this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.filter) {
        return this.service.search(page, this.perPage, this.filter);
      }
      return this.service.all(page, this.perPage);
    })).subscribe(pagination => {
      this.datatableData = this.datatableService.getDatatableData(columns, pagination);
    });
  }

  submit(): void {
    if (this.formValue.id) {
      this.service.update(this.formValue, this.imagesToServer).subscribe(() => {
        showToastSuccess('Motorista cadastrado', 'Salvo');
        this.modal.dismissAll();
        this.getAll();
      });
      return;
    }

    this.service.create(this.formValue, this.imagesToServer).subscribe(() => {
      showToastSuccess('Motorista cadastrado', 'Salvo');
      this.modal.dismissAll();
      this.getAll();
    });
  }

  search(filter: string): void {
    this.filter = filter;
    this.changeRouteWithParams(1, this.perPage, filter);
  }

  changeLengthRegisters(perPage: number): void {
    this.perPage = perPage;
    this.changeRouteWithParams(1, perPage, this.filter);
  }

  changePage(page: number): void {
    this.changeRouteWithParams(page, this.perPage, this.filter);
  }

  private changeRouteWithParams(page: number, perPage: number, search: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page, perPage, search } });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      cpf_cnpj: [null, Validators.required],
      cnh: [null, Validators.required],
      category_cnh: [null, Validators.required],
      phone: [null],
      password: [null],
      status: [true, Validators.required],
      transporter_id: [this.auth.currentUserValue.transporter.id],
      type: ['driver']
    });
  }

  openModal(content): void {
    this.modal.open(content, {size: 'full'});
  }

  upload(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images[index] = e.target.result;
        this.imagesToServer[index] = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onError(event): void {
    event.target.src = 'assets/images/no-image.png';
  }

  seeData(event, content): void {
    const selected = this.datatableData.paginationData.data.find(i => i.id === event.params.id);
    selected.status = selected.status === 1 ? true : false;
    this.images[0] = `${environment.storage}users/${selected.id}.png`;
    this.images[1] = `${environment.storage}users/cpf/${selected.front_cpf}`;
    this.images[2] = `${environment.storage}users/cpf/${selected.back_cpf}`;
    this.images[3] = `${environment.storage}users/cnh/${selected.front_cnh}`;
    this.images[4] = `${environment.storage}users/cnh/${selected.back_cnh}`;
    this.form.patchValue(selected);
    this.openModal(content);
  }
}
