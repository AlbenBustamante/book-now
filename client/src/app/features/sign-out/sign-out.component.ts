import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css',
})
export default class SignOutComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  ngOnInit() {
    this._authService.logOut();
    this._router.navigateByUrl('/auth');
  }
}
