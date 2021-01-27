import { DatatableColumn } from '@models/Datatable';

const changesColumns: DatatableColumn[] = [
  { title: 'Cliente', name: 'client.name', width: '200px' },
  { title: 'Origem', name: 'budget.origin.completed' },
  { title: 'Destino', name: 'budget.destination.completed' },
  { title: 'Data', name: 'budget.date' },
  {
    title: 'Ações', name: 'action', actions: [
      { title: 'Ver Dados', icon: 'mdi-eye-outline', function: 'openModal', params: ['id'] }
    ]
  },
];

export default changesColumns;
