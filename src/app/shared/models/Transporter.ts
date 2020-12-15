import { User } from './User';

export interface Transporter {
  name: string;
  phone: string;
  responsible: string;
  user_id: number;
  user: User;
}
