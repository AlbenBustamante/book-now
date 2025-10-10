import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  readonly onClickOutside = output<void>();

  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  emitOnClickOutside(target: HTMLElement) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.onClickOutside.emit();
    }
  }
}
