import { inject, Injectable } from '@angular/core';
import { Role } from '@core/enums/role.enum';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _jwtService = inject(JwtService);

  private _jwt() {
    return this._jwtService.get();
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
  }
}
