import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryModel, StateModel } from '@core/models/country.model';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly _http = inject(HttpClient);
  private readonly _countriesApiUrl =
    'https://api.countrystatecity.in/v1/countries';
  private readonly _countryApiKey = environment.countryApiKey;

  getAllCountries() {
    const headers = new HttpHeaders({ 'X-CSCAPI-KEY': this._countryApiKey });

    return this._http.get<CountryModel[]>(this._countriesApiUrl, { headers });
  }

  getStatesByCountry(iso2: string) {
    const headers = new HttpHeaders({ 'X-CSCAPI-KEY': this._countryApiKey });

    return this._http.get<StateModel[]>(
      `${this._countriesApiUrl}/${iso2}/states`,
      { headers },
    );
  }
}
