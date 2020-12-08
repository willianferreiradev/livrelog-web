import { Pagination } from './Pagination';

export interface DatatableColumn {
  name: string;
  title: string;
  width?: string;
}


export interface DatatableData<T> {
  columns: DatatableColumn[];
  paginationData: Pagination<T>;
}
