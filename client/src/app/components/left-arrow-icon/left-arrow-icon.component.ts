import { Component } from '@angular/core';

@Component({
  selector: 'svg[left-arrow-icon]',
  template: ` <svg:path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />`,
  host: {
    '[attr.viewBox]': 'viewBox',
    '[attr.fill]': 'fill',
    '[attr.xmlns]': 'xmlns',
  },
})
export class LeftArrowIconComponent {
  readonly viewBox = '0 0 24 24';
  readonly fill = 'none';
  readonly xmlns = 'http://www.w3.org/2000/svg';
}
