import { Component, effect, inject } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { RedirectComponent } from '../components/redirect/redirect.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { signUpStore } from './sign-up.store';
import { SignUp } from './models/sign-up.model';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputComponent,
    ButtonComponent,
    RedirectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [signUpStore],
})
export default class SignUpComponent {
  private readonly _store = inject(signUpStore);
  readonly form;

  constructor(private readonly _fb: FormBuilder) {
    this.form = this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

    effect(() => {
      if (this._store.status() === 'loading') {
        this.form.disable();
      } else {
        if (this._store.status() === 'success') {
          this.form.reset();
        }

        this.form.enable();
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this._store.signUp(this.form.value as SignUp);
  }

  get loading() {
    return this._store.status() === 'loading';
  }
}
