import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { LeftArrowIconComponent } from '@components/left-arrow-icon/left-arrow-icon.component';

@Component({
  selector: 'app-customers-search',
  imports: [InputComponent, LeftArrowIconComponent, NgClass],
  templateUrl: './customers-search.component.html',
  styleUrl: './customers-search.component.css',
})
export class CustomersSearchComponent {
  readonly showReturn = input.required<boolean>();
  readonly onReturn = output<boolean>();

  return() {
    this.onReturn.emit(true);
  }
}
