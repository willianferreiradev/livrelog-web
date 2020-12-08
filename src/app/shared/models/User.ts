export interface User {
  active: number | boolean;
  cpf_cnpj: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  type: string;
  updated_at: string;
  photo?: string;
}
