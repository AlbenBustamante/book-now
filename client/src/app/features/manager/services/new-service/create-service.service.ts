import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { NewAddressModel, NewServiceModel } from './new-service.model';
import { ServiceModel } from '@core/models/service.model';

@Injectable({
  providedIn: 'root',
})
export class CreateServiceService {
  private readonly _url = `${environment.apiUrl}/services`;
  private readonly _http = inject(HttpClient);

  create(data: NewServiceModel, address: NewAddressModel, coverPhoto: File) {
    const formData = new FormData();

    const service = {
      ...data,
      address,
    };

    const jsonBlob = new Blob([JSON.stringify(service)], {
      type: 'application/json',
    });

    formData.append('service', jsonBlob);
    formData.append('coverPhoto', coverPhoto);

    return this._http.post<ServiceModel>(this._url, formData);
  }
}
