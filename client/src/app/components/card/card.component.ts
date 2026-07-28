import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

export type CardTheme = 'white' | 'dark';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  readonly theme = input<CardTheme>('white');

  private readonly _map = {
    white: 'bg-white ring-primary-600 border-gray-300',
    dark: 'bg-gray-100 ring-primary-600 border-gray-300',
  };

  get styles() {
    return this._map[this.theme()];
  }
}
