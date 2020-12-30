import { DatatableColumn } from '@models/Datatable';

const userColumns: DatatableColumn[] = [
  { title: 'Foto', name: 'photo' },
  { title: 'Nome', name: 'name' },
  { title: 'Email', name: 'email' },
  { title: 'Celular', name: 'phone', mask: '(00) 00000-0000' },
  { title: 'Criado em', name: 'created_at' },
];

export default userColumns;

