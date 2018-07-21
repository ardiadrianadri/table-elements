import { Config } from './config';

export interface DataTable<T> {
   pageActual: number;
   lastPage: number;
   data: T[];
   config?: Config;
   size: number;
   dragRow?: number;
}
