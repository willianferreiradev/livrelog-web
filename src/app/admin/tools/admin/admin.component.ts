import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { TypeUser } from '@shared/enums/TypeUser';
import { DatatableData } from '@shared/models/Datatable';
import { User } from '@shared/models/User';
import { TitlePageService } from '@shared/services/title-page.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../../queries/users/users.service';
import columns from './admin.columns';
import { BaseForm} from '@shared/helpers/BaseForm';
import { showToastSuccess } from '@shared/helpers/toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseForm implements OnInit, OnDestroy {
  datatableData: DatatableData<User>;
  perPage: number;
  filter = '';
  subscription: Subscription;

  constructor(
    private usersService: UsersService,
    private datatableService: DatatableService<User>,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitlePageService,
    private modalService: NgbModal,
    private formBuider: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({
      title: `Lista de Administradores`,
      breadcrumb: ['Home', 'Ferramentas', 'Administradores']
    });
    this.subscription = this.getAdmins();

    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  submit(): void {
    this.usersService.createAdmin(this.formValue).subscribe(e => {
      showToastSuccess('Usuário cadastrado!', 'Salvo!');
      this.getAdmins();
      this.modalService.dismissAll();
      this.reset();
    });
  }

  createForm(): void {
    this.form = this.formBuider.group({
      name: [null, Validators.required],
      phone: [null],
      email: [null, Validators.required],
    });
  }

  private changeRouteWithParams(page: number, perPage: number, search: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page, perPage, search } });
  }

  openModal(content): void {
    this.modalService.open(content).result.then(() => this.reset());
  }

  private getUserWithPhoto(user: User): User {
    user.photo = 'assets/images/users/avatar-1.jpg';
    return user;
  }

  private getAdmins(): any {
    return this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.filter) {
        return this.usersService.search(page, this.perPage, this.filter, TypeUser.ADMIN);
      }
      return this.usersService.all(page, this.perPage, TypeUser.ADMIN);
    })).subscribe(pagination => {
      pagination.data = pagination.data.map(this.getUserWithPhoto);
      this.datatableData = this.datatableService.getDatatableData(columns, pagination);
    });
  }
}
