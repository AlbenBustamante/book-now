import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { LogIn, LogInResponse } from '../models/log-in.model';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  private readonly _url = `${environment.apiUrl}/auth/log-in`;

  constructor(private readonly _http: HttpClient) {}

  logIn(data: LogIn) {
    return this._http.post<LogInResponse>(this._url, data);
  }
}
