import { DatatableColumn } from '@models/Datatable';

const changesColumns: DatatableColumn[] = [
  { title: 'Modelo', name: 'model', width: '20%' },
  { title: 'Fabricante', name: 'manufacturer', width: '20%' },
  { title: 'Ano', name: 'year', width: '17%' },
  { title: 'Placa', name: 'license', width: '17%' },
  { title: 'Status', name: 'status', width: '17%' },
  {
    title: 'Ações', name: 'action', actions: [
      { title: 'Ver Dados', icon: 'mdi-file-document-outline', function: 'openModal', params: ['id'] }
    ]
  },
];

export default changesColumns;
