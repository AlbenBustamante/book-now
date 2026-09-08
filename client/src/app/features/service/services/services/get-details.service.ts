import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { skipJwtFn } from '@core/contexts/jwt.context';
import { ServiceDetailModel } from '@core/models/service.model';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetDetailsService {
  private readonly _url = `${environment.apiUrl}/services`;

  constructor(private readonly _http: HttpClient) {}

  getDetailsById(id: string) {
    return this._http.get<ServiceDetailModel>(`${this._url}/details/${id}`, {
      context: skipJwtFn(),
    });
  }
}
