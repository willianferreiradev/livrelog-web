import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { Pagination } from '@models/Pagination';

enum ColumnType {
  PHOTO = 'photo',
  CREATED_AT = 'created_at',
  DATE = 'date',
  ACTION = 'action',
  STATUS = 'status'
}
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() columns: any;
  @Input() rows: any;
  @Input() props: any;
  @Input() paginationData: Pagination<any>;
  @Input() filter = '';

  @Output() changeLengthRegisters: EventEmitter<any> = new EventEmitter(null);
  @Output() changePage: EventEmitter<any> = new EventEmitter(null);
  @Output() search: EventEmitter<any> = new EventEmitter(null);
  @Output() actionEvent: EventEmitter<any> = new EventEmitter(null);

  numbersRegister = 10;
  form: FormGroup;
  ColumnType = ColumnType;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filter: [this.filter]
    });

    this.emitSearchEvent();
  }

  emitSearchEvent(): void {
    this.form.get('filter').valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.search.emit(value));
  }

  pagination(): number[] {
    if (!this.paginationData) return;

    const pages = Array.from({ length: this.paginationData.last_page }, (_, i) => i + 1);
    const last = this.paginationData.last_page;
    const current = this.paginationData.current_page;

    if (this.paginationData.last_page <= 10) return pages;

    if (this.paginationData.last_page > 10 && this.paginationData.current_page <= 5) return pages.slice(0, 10);

    if ((this.paginationData.last_page - this.paginationData.current_page) < 5) return pages.slice(last - 10, last);

    return pages.slice(current - 6, current + 5);
  }

  getColumnValue(data, prop: string): string {
    if (!prop) return '';
    let dataWithProp = data;
    prop.split('.').forEach(item => dataWithProp = dataWithProp[item]);
    return dataWithProp;
  }

  getParams(params: string[], data: unknown): any {
    const newParams = {};
    params.forEach(item => newParams[item] = data[item]);
    return newParams;
  }

  getStatus(value: string): string {
    if (typeof value === 'number') {
      if (value === 1) {
        return 'ATIVO';
      }

      return 'INATIVO';
    }

    return value;
  }

  getBadge(value: string): string {
    if (typeof value === 'number')  {
      if (value === 1) {
        return 'badge-success';
      }

      return 'badge-danger';
    }
    if (value === 'Sem respostas') {
      return 'badge-danger';
    } else if (value === 'Aguardando') {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }
}
