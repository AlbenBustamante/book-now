import { Component, output } from '@angular/core';
import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-dropdown',
  imports: [DropdownOptionComponent, DivisorComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  readonly onClick = output<void>();
}
