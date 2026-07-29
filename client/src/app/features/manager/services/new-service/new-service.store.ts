import { computed, inject } from '@angular/core';
import {
  CityModel,
  CountryModel,
  StateModel,
} from '@core/models/country.model';
import { CountryService } from '@core/services/country.service';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { NewAddressModel, NewServiceModel } from './new-service.model';

interface State {
  initialLoading: boolean;
  loadingStates: boolean;
  loadingCities: boolean;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];
  coverPhoto: File | undefined;
  serviceInfo: NewServiceModel | undefined;
  serviceAddress: NewAddressModel | undefined;
}

const initialState: State = {
  initialLoading: false,
  loadingStates: false,
  loadingCities: false,
  countries: [],
  states: [],
  cities: [],
  coverPhoto: undefined,
  serviceInfo: undefined,
  serviceAddress: undefined,
};

export const NewServiceStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    coverPhotoHeadline: computed(() => {
      const selectedFile = store.coverPhoto();

      if (selectedFile) {
        return 'Click to change the cover photo';
      }

      return 'Click to upload';
    }),
    url: computed(() => {
      const selectedFile = store.coverPhoto();

      if (!selectedFile) {
        return 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';
      }

      return URL.createObjectURL(selectedFile);
    }),
  })),
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
    setCoverPhoto: (coverPhoto: File) => {
      patchState(store, { coverPhoto });
    },
    setServiceAddress: (serviceAddress: NewAddressModel) => {
      patchState(store, { serviceAddress });
    },
    setServiceInfo: (serviceInfo: NewServiceModel) => {
      patchState(store, { serviceInfo });
    },
  })),
);
