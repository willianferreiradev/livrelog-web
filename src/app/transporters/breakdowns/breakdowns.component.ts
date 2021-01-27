import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { BreakdownService } from './breakdown.service';
import columns from './breakdown.columns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';
import { showToastSuccess } from '@shared/helpers/toastr';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.scss']
})
export class BreakdownsComponent implements OnInit {
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';
  selectedChange: any;
  storageBreakdown = `${environment.storage}breakdowns/`;
  message: string;

  constructor(
    private title: TitlePageService,
    private route: ActivatedRoute,
    private service: BreakdownService,
    private datatableService: DatatableService<any>,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Avarias', breadcrumb: ['Home', 'Avarias'] });
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

  seeData(event, content): void{
    this.selectedChange = this.datatableData.paginationData.data.find(i => i.id === event.params.id);
    this.message = this.selectedChange.message;
    this.modalService.open(content, { size: 'full' });
  }

  saveMessage(): void {
    this.service.update(this.selectedChange.id, this.message).subscribe(e => {
      this.selectedChange.message = this.message;
      showToastSuccess('Mensagem enviada', 'Salvo');
      this.modalService.dismissAll();
    });
  }
}
