import { DataTable } from './data';

export enum outerActions {
  LOAD_ROW = 'LOW_ROW',
  LOAD_CONFIG = 'LOAD_CONFIG',
  ROW_SELECTED = 'ROW_SELECTED'
}

export enum InnerActions {
  LOAD_ROW_SUCCESS = 'LOAD_ROW_SUCCESS',
  LOAD_CONFIG_SUCCESS = 'LOAD_CONFIG_SUCCESS',
  DRAG_ROW = 'DRAG_ROW',
  DROP_ROW = 'DROP_ROW'
}


export interface TableAction {
  type: outerActions | InnerActions;
  payload?: any;
}
