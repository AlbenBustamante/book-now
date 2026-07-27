import { inject } from '@angular/core';
import { CountryModel, StateModel } from '@core/models/country.model';
import { CountryService } from '@core/services/country.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface State {
  initialLoading: boolean;
  loadingStates: boolean;
  countries: CountryModel[];
  states: StateModel[];
}

const initialState: State = {
  initialLoading: false,
  loadingStates: false,
  countries: [],
  states: [],
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
    fetchStatesByIso2: (iso2: string) => {
      patchState(store, { loadingStates: true });

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
  })),
);
