import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dropdown-option',
  imports: [],
  templateUrl: './dropdown-option.component.html',
  styleUrl: './dropdown-option.component.css',
})
export class DropdownOptionComponent {
  readonly text = input.required<string>();
}
