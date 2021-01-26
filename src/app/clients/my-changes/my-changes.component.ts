import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { MyChangeService } from './my-change.service';
import columns from './my-change.columns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-my-changes',
  templateUrl: './my-changes.component.html',
  styleUrls: ['./my-changes.component.scss']
})
export class MyChangesComponent implements OnInit {
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';

  selectedChange: any;
  selectedBudget: any;
  storageLink = `${environment.storage}houses/`;

  constructor(
    private title: TitlePageService,
    private moveService: MyChangeService,
    private route: ActivatedRoute,
    private router: Router,
    private datatableService: DatatableService<any>,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Mudanças', breadcrumb: ['Home', 'Minhas Mudanças'] });
    this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.search) {
        return this.moveService.search(page, this.perPage, this.filter);
      }
      return this.moveService.all(page, this.perPage);
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

  seeData(event: any, content: any): void {
    const budgets = this.datatableData.paginationData.data;
    this[event.function](content, budgets.find(i => i.id === event.params.id));
  }

  openModal(content: any, change: any): void {
    this.selectedChange = change;
    const budget = this.selectedChange.budget;

    this.selectedChange.budget.withdrawal = budget.characteristics.find(c => c.type === 'withdrawal');
    this.selectedChange.budget.delivery = budget.characteristics.find(c => c.type === 'delivery');

    this.modalService.open(content, { size: 'full' }).result.then(() => this.selectedChange = null);
  }
}
