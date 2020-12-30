import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { Budget } from '@shared/models/Budget';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { BudgetService } from './budget.service';
import columns from './budget.columns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  datatableData: DatatableData<Budget>;
  perPage: number;
  filter = '';
  selectedBudget: Budget;

  constructor(
    private title: TitlePageService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router,
    private datatableService: DatatableService<Budget>,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Orçamentos', breadcrumb: ['Home', 'Consultas', 'Orçamentos'] });
    this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.search) {
        return this.budgetService.search(page, this.perPage, this.filter);
      }
      return this.budgetService.all(page, this.perPage);
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

  openModal(content: any, budget: Budget): void {
    this.selectedBudget = budget;

    this.selectedBudget.withdrawal = budget.characteristics.find(c => c.type === 'withdrawal');
    this.selectedBudget.delivery = budget.characteristics.find(c => c.type === 'delivery');

    console.log(this.selectedBudget);

    this.modalService.open(content, { size: 'full' }).result.then(() => this.selectedBudget = null);
  }
}
