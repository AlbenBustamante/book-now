import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../components/custom-input/custom-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [CustomInputComponent, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export default class LogInComponent {
  readonly form;

  constructor(private readonly _fb: FormBuilder) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
