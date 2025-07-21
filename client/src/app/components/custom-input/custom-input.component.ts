import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) label!: string;
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'off';
  @Input() control: FormControl = new FormControl('');
}
