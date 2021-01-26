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
    this.title.titleSubject.next({ title: 'Reportar avarias', breadcrumb: ['Home', 'Reportar avarias'] });
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
