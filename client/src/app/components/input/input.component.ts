import { Component, input, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  readonly name = input.required<string>();
  readonly label = input<string | null>(null);
  readonly type = input<'text' | 'number' | 'email' | 'password' | 'search'>(
    'text'
  );
  readonly placeholder = input<string>('');
  readonly autocomplete = input<'name' | 'family-name' | 'email' | 'off'>(
    'off'
  );
  readonly control = input<FormControl>(new FormControl(''));
}
