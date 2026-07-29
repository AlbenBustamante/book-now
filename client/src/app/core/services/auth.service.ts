import { inject, Injectable } from '@angular/core';
import { Role } from '@core/enums/role.enum';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _jwtService = inject(JwtService);
  private readonly _router = inject(Router);

  private _jwt() {
    return this._jwtService.getDecoded();
  }

  isLogged() {
    return this._jwt() !== null;
  }

  isProvider() {
    if (!this.isLogged()) {
      return false;
    }

    return this._jwt()!.role === Role.PROVIDER;
  }

  logOut() {
    this._jwtService.delete();
    this._router.navigateByUrl('/auth');
  }
}
