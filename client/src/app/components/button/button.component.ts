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
  readonly color = input<'primary'>('primary');
  readonly type = input<'submit' | 'button'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);

  private mapColor = {
    primary:
      'bg-primary-500 enabled:hover:bg-primary-600 enabled:active:bg-primary-700 text-primary-50 enabled:active:ring-4 ring-primary-200 enabled:focus:ring-4 ease-in-out disabled:opacity-50',
  };

  get styles() {
    return this.mapColor[this.color()];
  }
}
