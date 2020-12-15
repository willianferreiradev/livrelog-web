import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatatableData } from '@shared/models/Datatable';
import { Transporter } from '@models/Transporter';
import { Subscription } from 'rxjs';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlePageService } from '@shared/services/title-page.service';
import { TransportersService } from './transporters.service';
import { switchMap } from 'rxjs/operators';
import columns from './transporter.columns';
@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.scss']
})
export class TransportersComponent implements OnInit, OnDestroy {
  datatableData: DatatableData<Transporter>;
  perPage: number;
  filter = '';
  subscription: Subscription;

  constructor(
    private transporterService: TransportersService,
    private datatableService: DatatableService<Transporter>,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitlePageService,
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Transportadoras', breadcrumb: ['Home', 'Consultas', 'Transportadoras'] });
    this.subscription = this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.filter) {
        return this.transporterService.search(page, this.perPage, this.filter);
      }
      return this.transporterService.all(page, this.perPage);
    })).subscribe(pagination => {
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
}
