import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { BreakdownService } from './breakdown.service';
import columns from './breakdown.columns';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.scss']
})
export class BreakdownsComponent implements OnInit {
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';

  constructor(
    private title: TitlePageService,
    private breakdownService: BreakdownService,
    private route: ActivatedRoute,
    private router: Router,
    private datatableService: DatatableService<any>
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Avarias', breadcrumb: ['Home', 'Consultas', 'Avarias'] });
    this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.search) {
        return this.breakdownService.search(page, this.perPage, this.filter);
      }
      return this.breakdownService.all(page, this.perPage);
    })).subscribe(pagination => {
      this.datatableData = this.datatableService.getDatatableData(columns, pagination);
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

}
