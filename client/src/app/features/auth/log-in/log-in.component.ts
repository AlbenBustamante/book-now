import { Component, effect, inject } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { LogIn } from './models/log-in.model';
import { LogInStore } from './log-in.store';
import { RedirectComponent } from '../components/redirect/redirect.component';
import { JwtService } from '@core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    RedirectComponent,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [LogInStore],
})
export default class LogInComponent {
  private readonly _store = inject(LogInStore);
  readonly form;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _jwtService: JwtService,
    private readonly _router: Router
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    effect(() => {
      if (this._store.status() === 'loading') {
        this.form.disable();
      } else {
        if (this._store.status() === 'success') {
          if (this._store.jwt() !== null) {
            this._jwtService.save(this._store.jwt()!);
            this._router.navigate(['manager']);
          }

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

    this._store.logIn(this.form.value as LogIn);
  }

  get loading() {
    return this._store.status() === 'loading';
  }
}
