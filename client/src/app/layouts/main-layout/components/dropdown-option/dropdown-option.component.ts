import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-option',
  imports: [RouterLink],
  templateUrl: './dropdown-option.component.html',
  styleUrl: './dropdown-option.component.css',
})
export class DropdownOptionComponent {
  readonly text = input.required<string>();
  readonly route = input.required<string>();
}
