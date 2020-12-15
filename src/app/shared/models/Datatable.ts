import { Pagination } from './Pagination';

export interface DatatableColumn {
  name?: string;
  title?: string;
  width?: string;
  actions?: Action[];
}

export interface Action {
  title: string;
  icon: string;
  function: string;
  params: string[];
}


export interface DatatableData<T> {
  columns: DatatableColumn[];
  paginationData: Pagination<T>;
}
