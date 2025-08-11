import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { SignUp } from '../models/sign-up.model';
import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly _url = `${environment.apiUrl}/auth/register`;

  constructor(private readonly _http: HttpClient) {}

  signUp(data: SignUp) {
    return this._http.post<User>(this._url, data);
  }
}
