import {Action} from './action.model';

export interface Role {
  id: number;
  name: string;
  actions: Action[];
}
