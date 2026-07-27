import { inject } from '@angular/core';
import {
  CityModel,
  CountryModel,
  StateModel,
} from '@core/models/country.model';
import { CountryService } from '@core/services/country.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface State {
  initialLoading: boolean;
  loadingStates: boolean;
  loadingCities: boolean;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];
}

const initialState: State = {
  initialLoading: false,
  loadingStates: false,
  loadingCities: false,
  countries: [],
  states: [],
  cities: [],
};

export const NewServiceStore = signalStore(
  withState(initialState),
  withMethods((store, countryService = inject(CountryService)) => ({
    initialFetch: () => {
      patchState(store, { initialLoading: true });

      countryService.getAllCountries().subscribe({
        next: (countries) => {
          patchState(store, { countries, initialLoading: false });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { initialLoading: false });
        },
      });
    },
    fetchStatesByCountry: (iso2: string) => {
      patchState(store, { states: [], cities: [], loadingStates: true });

      countryService.getStatesByCountry(iso2).subscribe({
        next: (states) => {
          patchState(store, { states, loadingStates: false });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { loadingStates: false });
        },
      });
    },
    fetchCitiesByState: (countryIso2: string, stateIso2: string) => {
      patchState(store, { cities: [], loadingCities: true });

      countryService.getCitiesByState(countryIso2, stateIso2).subscribe({
        next: (cities) => {
          patchState(store, { cities, loadingCities: false });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { loadingStates: false });
        },
      });
    },
  })),
);
