import { Injectable } from '@angular/core';
import { DatatableColumn } from '@models/Datatable';
import { Pagination } from '@models/Pagination';
import { DatatableData } from '@models/Datatable';

@Injectable({
  providedIn: 'root'
})
export class DatatableService<T> {
  getDatatableData(columns: DatatableColumn[], paginationData: Pagination<T>): DatatableData<T> {
    return {
      columns,
      paginationData,
    };
  }
}
