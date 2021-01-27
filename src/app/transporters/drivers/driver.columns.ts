import { DatatableColumn } from '@models/Datatable';

const changesColumns: DatatableColumn[] = [
  { title: 'Nome', name: 'name', width: '20%' },
  { title: 'Celular', name: 'phone', width: '20%', mask: '(00) 00000-0000' },
  { title: 'CPF', name: 'cpf_cnpj', width: '20%', mask: '000.000.000-00' },
  { title: 'CNH', name: 'cnh', width: '20%' },
  { title: 'Categoria', name: 'category_cnh', width: '20%' },
  { title: 'Status', name: 'status', width: '20%' },
  // { title: 'Fabricante', name: 'manufacturer', width: '20%' },
  // { title: 'Ano', name: 'year', width: '17%' },
  // { title: 'Placa', name: 'license', width: '17%' },
  // { title: 'Status', name: 'status', width: '17%' },
  {
    title: 'Ações', name: 'action', actions: [
      { title: 'Ver Dados', icon: 'mdi-pen', function: 'openModal', params: ['id'] }
    ]
  },
];

export default changesColumns;
