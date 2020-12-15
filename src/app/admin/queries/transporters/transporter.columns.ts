import { DatatableColumn } from '@models/Datatable';

const transporterColumns: DatatableColumn[] = [
  { title: 'Nome Fantasia', name: 'user.name' },
  { title: 'Razão Social', name: 'name' },
  { title: 'CNPJ', name: 'user.cpf_cnpj', mask: '00.000.000/0000-00' },
  { title: 'Responsável', name: 'responsible' },
  { title: 'Telefone', name: 'phone', mask: '(00) 0000-0000' },
  { title: 'Celular', name: 'user.phone', mask: '(00) 00000-0000' },
  { title: 'Email', name: 'user.email' },
  { title: 'Criado em', name: 'created_at' },
];

export default transporterColumns;

