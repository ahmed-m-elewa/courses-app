import {Role} from './role.model';

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
}
