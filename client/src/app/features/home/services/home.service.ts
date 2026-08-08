import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { HomeModel } from '../home.model';
import { skipJwtFn } from '@core/contexts/jwt.context';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly _url = `${environment.apiUrl}/home`;
  private readonly _http = inject(HttpClient);

  getHome() {
    return this._http.get<HomeModel>(this._url, { context: skipJwtFn() });
  }
}
