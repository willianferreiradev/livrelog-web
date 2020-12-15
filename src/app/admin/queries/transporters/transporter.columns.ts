import { DatatableColumn } from '@models/Datatable';

const transporterColumns: DatatableColumn[] = [
  { title: 'Nome Fantasia', name: 'user.name' },
  { title: 'Razão Social', name: 'name' },
  { title: 'CNPJ', name: 'user.cpf_cnpj' },
  { title: 'Responsável', name: 'responsible' },
  { title: 'Telefone', name: 'phone' },
  { title: 'Celular', name: 'user.phone' },
  { title: 'Email', name: 'user.email' },
  { title: 'Criado em', name: 'created_at' },
];

export default transporterColumns;

