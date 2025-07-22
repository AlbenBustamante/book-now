import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [NgClass],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css',
})
export class CustomButtonComponent {
  @Input() color: 'primary' = 'primary';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  private colorMap = {
    primary:
      'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-primary-50 active:ring-4 ring-primary-200 focus:ring-4 ease-in-out ',
  };

  get getColor() {
    return this.colorMap[this.color];
  }
}
