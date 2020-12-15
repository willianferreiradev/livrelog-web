import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UsersService } from './users.service';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { User } from '@models/User';
import { DatatableData } from '@models/Datatable';
import columns from './user.columns';
import { Subscription } from 'rxjs';
import { TitlePageService } from '@shared/services/title-page.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  datatableData: DatatableData<User>;
  perPage: number;
  filter = '';
  subscription: Subscription;

  constructor(
    private usersService: UsersService,
    private datatableService: DatatableService<User>,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitlePageService
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Usuários', breadcrumb: ['Home', 'Consultas', 'Usuários']});
    this.subscription = this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.search) {
        return this.usersService.search(page, this.perPage, this.filter);
      }
      return this.usersService.all(page, this.perPage);
    })).subscribe(pagination => {
      pagination.data = pagination.data.map(this.getUserWithPhoto);
      this.datatableData = this.datatableService.getDatatableData(columns, pagination);
    });
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

  private changeRouteWithParams(page: number, perPage: number, search: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page, perPage, search } });
  }

  private getUserWithPhoto(user: User): User {
    user.photo = 'assets/images/users/avatar-1.jpg';
    return user;
  }
}
