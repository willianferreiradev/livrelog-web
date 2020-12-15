import { Address } from './Address';
import { User } from './User';

export interface Budget {
  id: number;
  date?: string;
  comments?: string;
  inventory?: string;
  client_id?: number;
  origin_id?: number;
  destination_id?: number;
  client?: User;
  origin?: Address
  destination?: Address
}
