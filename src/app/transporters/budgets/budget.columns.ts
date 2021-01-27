import { DatatableColumn } from '@models/Datatable';

const budgetColumns: DatatableColumn[] = [
  { title: 'ID', name: 'id' },
  { title: 'Cliente', name: 'client.name', width: '150px' },
  { title: 'Origem', name: 'origin.completed', width: '500px' },
  { title: 'Destino', name: 'destination.completed', width: '500px' },
  { title: 'Data', name: 'date' },
  { title: 'Criado em', name: 'created_at' },
  { title: 'Status', name: 'status' },
  { title: 'Ações', name: 'action', actions: [
    { title: 'Ver Orçamento', icon: 'mdi-eye-outline', function: 'openModal', params: ['id'] },
    { title: 'Fazer/Editar uma proposta', icon: 'mdi-eye-outline', function: 'openProposalModal', params: ['id', 'client_id'] }
  ] },
];

export default budgetColumns;

