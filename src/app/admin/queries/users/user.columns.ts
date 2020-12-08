import { DatatableColumn } from '@models/Datatable';

const userColumns: DatatableColumn[] = [
  { title: 'Foto', name: 'photo' },
  { title: 'Nome', name: 'name' },
  { title: 'Email', name: 'email' },
  { title: 'Celular', name: 'phone' },
  { title: 'Criado em', name: 'created_at' },
  { title: '', name: 'id' }
];

export default userColumns;

