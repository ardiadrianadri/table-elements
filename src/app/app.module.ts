import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { MyActiveDirective, MyTableComponent } from './components';
import { DEFAULT_TABLE, default_value } from './entities';
import { TableReducerService } from './reducers';


@NgModule({
  declarations: [
    MyActiveDirective,
    MyTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TableReducerService,
    { provide: DEFAULT_TABLE, useValue: default_value}
  ],
    // bootstrap: [MyTableComponent]
  entryComponents: [MyTableComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const appElements = createCustomElement(MyTableComponent, {injector});
    customElements.define('my-table', appElements);
  }

  ngDoBootstrap() { }
}
