import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { Budget } from '@shared/models/Budget';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { BudgetService } from './budget.service';
import columns from './budget.columns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';
import { BaseForm } from '@shared/helpers/BaseForm';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@shared/services/authentication.service';
import { showToastError } from '@shared/helpers/toastr';
@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent extends BaseForm implements OnInit {
  datatableData: DatatableData<Budget>;
  perPage: number;
  filter = '';
  selectedBudget: Budget;
  storageLink = `${environment.storage}houses/`;
  @ViewChild('contentProposal') contentProposalModal: ElementRef;

  constructor(
    private title: TitlePageService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router,
    private datatableService: DatatableService<Budget>,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Orçamentos', breadcrumb: ['Home', 'Consultas', 'Orçamentos'] });
    this.createForm();
    this.form.get('transporter_id').patchValue(this.auth.currentUserValue.transporter.id);
    this.route.queryParams.pipe(switchMap(params => {
      const page = params.page ?? 1;
      this.perPage = params.perPage ?? 10;
      this.filter = params.search ?? '';

      if (this.search) {
        return this.budgetService.search(page, this.perPage, this.filter);
      }
      return this.budgetService.all(page, this.perPage);
    })).subscribe((pagination: any) => {
      this.datatableData = this.datatableService.getDatatableData(columns, pagination);
    });
  }

  submit(): void {
    if (this.formValue.id) {
      this.budgetService.updateProposal(this.formValue).subscribe(proposal => {
        this.route.queryParams.pipe(switchMap(params => {
          const page = params.page ?? 1;
          this.perPage = params.perPage ?? 10;
          this.filter = params.search ?? '';

          if (this.search) {
            return this.budgetService.search(page, this.perPage, this.filter);
          }
          return this.budgetService.all(page, this.perPage);
        })).subscribe((pagination: any) => {
          this.modalService.dismissAll();
          this.datatableData = this.datatableService.getDatatableData(columns, pagination);
        });
      });
      return;
    }
    this.budgetService.createProposal(this.formValue).subscribe(proposal => {
      this.route.queryParams.pipe(switchMap(params => {
        const page = params.page ?? 1;
        this.perPage = params.perPage ?? 10;
        this.filter = params.search ?? '';

        if (this.search) {
          return this.budgetService.search(page, this.perPage, this.filter);
        }
        return this.budgetService.all(page, this.perPage);
      })).subscribe((pagination: any) => {
        this.modalService.dismissAll();
        this.datatableData = this.datatableService.getDatatableData(columns, pagination);
      });
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      price: [null, Validators.required],
      user_id: [null, Validators.required],
      transporter_id: [null, Validators.required],
      budget_id: [null, Validators.required],
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
    if (event.function === 'openProposalModal') {
      this.openProposalModal(event.params.id, event.params.client_id);
      return;
    }
    const budgets = this.datatableData.paginationData.data;
    this[event.function](content, budgets.find(i => i.id === event.params.id));
  }

  openModal(content: any, budget: Budget): void {
    this.selectedBudget = budget;

    this.selectedBudget.withdrawal = budget.characteristics.find(c => c.type === 'withdrawal');
    this.selectedBudget.delivery = budget.characteristics.find(c => c.type === 'delivery');

    this.modalService.open(content, { size: 'full' }).result.then(() => this.selectedBudget = null);
  }

  openProposalModal(id: number, client: number): void {
    const budget = this.datatableData.paginationData.data.find(i => Number(i.id) === Number(id));
    if (budget.status === 'Sem respostas') {
      showToastError('A data dessa mudança já passou, não é possivel fazer uma poroposta', 'Erro');
      return;
    }

    const proposal = budget.proposals.find(p => p.transporter_id === this.auth.currentUserValue.transporter.id);
    if (proposal) {
      this.form.get('price').patchValue(proposal.price);
      this.form.get('id').patchValue(proposal.id);
    } else {
      this.form.get('price').patchValue(null);
      this.form.get('id').patchValue(null);
    }

    this.form.get('budget_id').patchValue(id);
    this.form.get('user_id').patchValue(client);
    this.modalService.open(this.contentProposalModal);
  }
}
