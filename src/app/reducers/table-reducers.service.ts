import { Injectable } from '@angular/core';

import { InnerActions, TableAction, DataTable} from '../entities';

@Injectable()
export class TableReducerService {

  public reduce( action: TableAction, state: DataTable<any> ): DataTable<any> {
    console.log('Run Reduce: ', action);
    const newState = {...state};

    switch (action.type) {
      case InnerActions.LOAD_CONFIG_SUCCESS:
        newState.config = [...action.payload.config];
        break;
      case InnerActions.LOAD_ROW_SUCCESS:
        newState.lastPage = action.payload.lastPage;
        newState.pageActual = action.payload.pageActual;
        newState.data = [...action.payload.data];
      break;
      case InnerActions.DRAG_ROW:
        newState.dragRow = action.payload.index;
      break;
      case InnerActions.DROP_ROW:
        const rowMoved = {...newState.data[newState.dragRow]};
        const data = [...newState.data];
        data.splice(newState.dragRow, 1);
        data.splice(action.payload.index, 0, rowMoved);
        newState.data = [...data];
      break;
    }

    return newState;
  }
}
