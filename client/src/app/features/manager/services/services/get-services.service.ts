import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageModel } from '@core/models/page.model';
import { ServiceModel } from '@core/models/service.model';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetServicesService {
  private readonly _url = `${environment.apiUrl}/services`;
  private readonly _http = inject(HttpClient);

  getServices(pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .append('pageNumber', pageNumber)
      .append('pageSize', pageSize);

    return this._http.get<PageModel<ServiceModel>>(this._url, { params });
  }
}
