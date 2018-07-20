import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const appElements = createCustomElement(AppComponent, {injector});
    customElements.define('my-app-root', appElements);
  }

  ngDoBootstrap() { }
}
