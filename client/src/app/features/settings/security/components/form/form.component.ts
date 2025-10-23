import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { EditableInputComponent } from '@features/settings/components/editable-input/editable-input.component';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, EditableInputComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private readonly _fb = inject(FormBuilder);

  readonly form = this._fb.group({
    email: ['johndoe@mail.com', [Validators.required, Validators.email]],
    password: [''],
    repeatPassword: [''],
  });
}
