import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomButtonComponent } from '@components/custom-button/custom-button.component';
import { LogIn } from './models/log-in.model';
import { LogInStore } from './log-in.store';

@Component({
  selector: 'app-log-in',
  imports: [CustomInputComponent, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [LogInStore],
})
export default class LogInComponent {
  private readonly _store = inject(LogInStore);
  readonly form;

  constructor(private readonly _fb: FormBuilder) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const data: LogIn = {
      email: this.form.get('email')?.value!,
      password: this.form.get('password')?.value!,
    };

    this._store.logIn(data);
    this.form.reset();
  }
}
