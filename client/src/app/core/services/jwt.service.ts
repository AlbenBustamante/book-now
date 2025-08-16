import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Jwt } from '@core/models/jwt.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly _key = 'jwt';

  constructor(private readonly _cookieService: CookieService) {}

  save(jwt: string) {
    const { exp } = jwtDecode<Jwt>(jwt);
    this._cookieService.set(this._key, jwt, { expires: exp });
  }

  get() {
    const jwt = this._cookieService.get(this._key);
    return jwtDecode<Jwt>(jwt);
  }
}
