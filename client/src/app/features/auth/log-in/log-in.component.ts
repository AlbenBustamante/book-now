import { Component, effect, inject } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { LogIn } from './models/log-in.model';
import { LogInStore } from './log-in.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
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

    effect(() => {
      if (this._store.status() === 'loading') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  onSubmit() {
    const data: LogIn = {
      email: this.form.get('email')?.value!,
      password: this.form.get('password')?.value!,
    };

    this._store.logIn(data);

    if (this._store.status() === 'success') {
      this.form.reset();
    }
  }

  get loading() {
    return this._store.status() === 'loading';
  }
}
