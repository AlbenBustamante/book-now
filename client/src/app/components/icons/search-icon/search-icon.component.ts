import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[search-icon]',
  template: `
    <svg:path
      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
      stroke="#737373"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `,
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
    '[attr.xmlns]': 'xmlns()',
  },
})
export class SearchIconComponent {
  readonly width = input<string>('800px');
  readonly height = input<string>('800px');
  readonly viewBox = input<string>('0 0 24 24');
  readonly fill = input<string>('none');
  readonly xmlns = input<string>('http://www.w3.org/2000/svg');
}
