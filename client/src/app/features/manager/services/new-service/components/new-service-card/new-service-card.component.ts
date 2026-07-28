import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardComponent, CardTheme } from '@components/card/card.component';

@Component({
  selector: 'app-new-service-card',
  imports: [CardComponent, NgClass],
  templateUrl: './new-service-card.component.html',
  styleUrl: './new-service-card.component.css',
})
export class NewServiceCardComponent {
  readonly headline = input.required<string>();
  readonly theme = input<CardTheme>('white');

  private readonly _map = {
    white: 'text-gray-800',
    dark: 'text-primary-800',
  };

  get styles() {
    return this._map[this.theme()];
  }
}
