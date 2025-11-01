import { formatCurrency, formatDate } from '@angular/common';
import { Component, inject, input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  private readonly _locale = inject(LOCALE_ID);

  readonly displayName = input.required<string>();
  readonly value = input.required<string | number | Date>();
  readonly pipe = input<'date' | 'time' | 'currency'>();

  get formattedValue() {
    switch (this.pipe()) {
      case 'date':
        return formatDate(this.value(), 'dd / MM / yyyy', this._locale);
      case 'time':
        return formatDate(this.value(), 'hh:mm aa', this._locale);
      case 'currency':
        return formatCurrency(this.value() as number, this._locale, '$');
      default:
        return this.value();
    }
  }
}
