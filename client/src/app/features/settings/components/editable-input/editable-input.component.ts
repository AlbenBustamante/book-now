import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-editable-input',
  imports: [InputComponent, NgClass],
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.css',
})
export class EditableInputComponent {
  readonly name = input.required<string>();
  readonly property = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly autocomplete = input.required<
    'name' | 'family-name' | 'email' | 'off'
  >();

  ngOnInit() {
    this.control().disable();
  }
}
