import { InjectionToken } from '@angular/core';
import { DataTable } from './data';

export const DEFAULT_TABLE: InjectionToken<DataTable<any>> = new InjectionToken<DataTable<any>>('DEFAULT_TABLE');

export const default_value: DataTable<any> = {
  pageActual: 0,
  lastPage: 0,
  data: [],
  config: [],
  size: 5
};
