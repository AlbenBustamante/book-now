import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Jwt } from '@core/models/jwt.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly _key = 'jwt';
  private readonly _path = '/';

  constructor(private readonly _cookieService: CookieService) {}

  save(jwt: string) {
    const expTime = new Date();
    expTime.setHours(expTime.getHours() + 24 * 7);

    this._cookieService.set(this._key, jwt, {
      path: this._path,
      expires: expTime,
      secure: true,
    });
  }

  get(): Jwt | '' {
    const jwt = this._cookieService.get(this._key);

    try {
      return jwtDecode<Jwt>(jwt);
    } catch (e) {
      return '';
    }
  }
}
