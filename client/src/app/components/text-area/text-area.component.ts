import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  readonly name = input.required<string>();
  readonly label = input<string | null>(null);
  readonly placeholder = input<string>('');
  readonly control = input<FormControl>(new FormControl(''));
}
