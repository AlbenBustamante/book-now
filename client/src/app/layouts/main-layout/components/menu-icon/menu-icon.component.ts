import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[menu-icon]',
  template: ` <svg:path d="M4 6H20M4 12H20M4 18H20" /> `,
  host: {
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
    '[attr.xmlns]': 'xmlns()',
  },
})
export class MenuIconComponent {
  readonly viewBox = input<string>('0 0 24 24');
  readonly fill = input<string>('none');
  readonly xmlns = input<string>('http://www.w3.org/2000/svg');
}
