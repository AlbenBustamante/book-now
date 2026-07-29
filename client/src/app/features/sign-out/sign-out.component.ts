import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css',
})
export default class SignOutComponent {
  private readonly _authService = inject(AuthService);

  ngOnInit() {
    this._authService.logOut();
  }
}
