import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { BaseForm } from '@shared/helpers/BaseForm';
import { DatatableData } from '@shared/models/Datatable';
import { AuthenticationService } from '@shared/services/authentication.service';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { VehicleService } from './vehicle.service';
import columns from './vehicle.columns';
import { environment } from '@environments/environment';
import { showToastSuccess } from '@shared/helpers/toastr';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent extends BaseForm implements OnInit {
  images = [];
  imagesToServer = [];
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';

  constructor(
    private title: TitlePageService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private service: VehicleService,
    private route: ActivatedRoute,
    private datatableService: DatatableService<any>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Veículos', breadcrumb: ['Home', 'Veículos'] });
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
        showToastSuccess('Veículo atualizado', 'Salvo!');
        this.modalService.dismissAll();
        this.getAll();
      });
      return;
    }
    this.service.create(this.formValue, this.imagesToServer).subscribe(() => {
      showToastSuccess('Veículo cadastrado', 'Salvo!');
      this.modalService.dismissAll();
      this.getAll();
    });
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

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      model: [null, Validators.required],
      manufacturer: [null, Validators.required],
      year: [null, Validators.required],
      license: [null, Validators.required],
      renavam_1: [null, Validators.required],
      renavam_2: [null, Validators.required],
      status: [true, Validators.required],
      transporter_id: [this.auth.currentUserValue.transporter.id, Validators.required],
    });
  }

  openModal(content): void {
    this.modalService.open(content, { size: 'full' });
  }

  onError(event): void {
    event.target.src = 'assets/images/no-image.png';
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

  seeData(event, content): void {
    const selected = this.datatableData.paginationData.data.find(i => i.id === event.params.id);
    selected.status = selected.status === 1 ? true : false;
    this.images[0] = `${environment.storage}vehicles/${selected.photo}`;
    this.images[1] = `${environment.storage}vehicles/${selected.front_renavam_photo}`;
    this.images[2] = `${environment.storage}vehicles/${selected.back_renavam_photo}`;
    this.form.patchValue(selected);
    this.openModal(content);
  }
}
