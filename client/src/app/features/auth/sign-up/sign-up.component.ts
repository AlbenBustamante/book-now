import { Component, effect, inject } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { RedirectComponent } from '../components/redirect/redirect.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpStore } from './sign-up.store';
import { SignUp } from './models/sign-up.model';
import { ActivatedRoute, Router } from '@angular/router';

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
})
export default class SignUpComponent {
  private readonly _store = inject(SignUpStore);
  readonly form;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
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
          this._router.navigate(['..', 'successful-registration'], {
            relativeTo: this._route,
          });

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
