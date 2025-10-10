import { Component, inject } from '@angular/core';
import { SignUpStore } from '../sign-up/sign-up.store';
import { ButtonComponent } from '@components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successful-registration',
  imports: [ButtonComponent],
  templateUrl: './successful-registration.component.html',
  styleUrl: './successful-registration.component.css',
})
export default class SuccessfulRegistrationComponent {
  private readonly _store = inject(SignUpStore);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  get user() {
    return this._store.user();
  }

  goToLogIn() {
    this._router.navigate(['..', 'sign-in'], { relativeTo: this._route });
  }
}
