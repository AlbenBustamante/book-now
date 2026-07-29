import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  readonly route = input<string>();
  readonly color = input<'primary' | 'gray'>('primary');
  readonly type = input<'submit' | 'button'>('button');
  readonly size = input<'sm' | 'md'>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);

  private readonly _mapColor = {
    primary:
      'bg-primary-500 enabled:hover:bg-primary-600 enabled:active:bg-primary-700 text-primary-50 ring-primary-200',
    gray: 'bg-gray-500 enabled:hover:bg-gray-600 enabled:active:bg-gray-700 text-gray-50 ring-gray-200',
  };

  private readonly _mapSize = {
    sm: 'text-xs sm:text-sm md:text-base px-4 py-2',
    md: 'text-sm sm:text-base md:text-lg px-5 py-2.5',
  };

  get styles() {
    const color = this._mapColor[this.color()];
    const size = this._mapSize[this.size()];
    return `${color} ${size}`;
  }
}
