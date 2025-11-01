import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditableInputComponent } from '@features/settings/components/editable-input/editable-input.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, EditableInputComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private readonly _fb = inject(FormBuilder);
  readonly photo = signal<File | null>(null);

  readonly form = this._fb.group({
    name: ['John', Validators.required],
    lastName: ['Doe', Validators.required],
  });
}
