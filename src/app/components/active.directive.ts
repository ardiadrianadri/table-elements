import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[my-active]'
})
export class MyActiveDirective {

  constructor(private _element: ElementRef) {}

  @HostListener('mouseover')
  onMouseOver() {
    this._element.nativeElement.classList.add('active');
  }

  @HostListener('mouseout')
  onMouseOut() {
    this._element.nativeElement.classList.remove('active');
  }
}
