import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { LeftArrowIconComponent } from '@components/left-arrow-icon/left-arrow-icon.component';

@Component({
  selector: 'app-manager-search-input',
  imports: [InputComponent, LeftArrowIconComponent, NgClass],
  templateUrl: './manager-search-input.component.html',
  styleUrl: './manager-search-input.component.css',
})
export class ManagerSearchInputComponent {
  readonly placeholder = input.required<string>();
  readonly showReturn = input.required<boolean>();
  readonly onReturn = output<boolean>();

  return() {
    this.onReturn.emit(true);
  }
}
