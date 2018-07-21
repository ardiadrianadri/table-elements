import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import {
  DataTable,
  DEFAULT_TABLE,
  InnerActions,
  outerActions,
  TableAction
} from '../entities';

import { TableReducerService } from '../reducers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MyTableComponent extends Subject<TableAction> implements OnInit, OnDestroy {

  public state$: BehaviorSubject<DataTable<any>>;

  constructor(
    @Inject(DEFAULT_TABLE) private _defaultValue,
    private _reducer: TableReducerService
  ) {
    super();
    this.state$ = new BehaviorSubject(this._defaultValue);
  }

  ngOnInit() {
    console.log('Do the subscription');
    this.subscribe((action: TableAction) => {
      console.log('Inner subscriber: ', action);
      this.state$.next(this._reducer.reduce(action, this.state$.value));
    });

    this.next({
      type: outerActions.LOAD_CONFIG
    });

    this.next({
      type: outerActions.LOAD_ROW,
      payload: {
        page: 0,
        size: 5
      }
    });
  }

  ngOnDestroy() {
    this.state$.complete();
    this.complete();
  }

  public changePage(pageNum: number) {
    const state = this.state$.value;
    const num = (pageNum < 0) ? 0 :
      (pageNum >= state.lastPage) ? (state.lastPage - 1) : pageNum;

    this.next({
      type: outerActions.LOAD_ROW,
      payload: {
        page: num,
        size: state.size
      }
    });
  }

  public changeSize(event: any) {
    const select = event.srcElement;
    const options = select.options;
    this.next({
      type: outerActions.LOAD_ROW,
      payload: {
        page: 0,
        size: parseInt(options[select.selectedIndex].value, 10)
      }
    });
  }

  public onSelect (index: number) {
    const state = this.state$.value;
    this.next({
      type: outerActions.ROW_SELECTED,
      payload: (index + (state.pageActual * state.size))
    });
  }

  public onDragStart( index: number) {
    this.next({
      type: InnerActions.DRAG_ROW,
      payload: {
        index: index
      }
    });
  }

  public onDrop(index: any) {
    this.next({
      type: InnerActions.DROP_ROW,
      payload: {
        index: index
      }
    });
  }

  public onDragOver(event: any) {
    event.preventDefault();
  }
}
