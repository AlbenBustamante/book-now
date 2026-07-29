import { Component, inject } from '@angular/core';
import { SignUpStore } from '../sign-up/sign-up.store';
import { ButtonComponent } from '@components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-successful-registration',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './successful-registration.component.html',
  styleUrl: './successful-registration.component.css',
})
export default class SuccessfulRegistrationComponent {
  private readonly _store = inject(SignUpStore);

  get user() {
    return this._store.user();
  }
}
