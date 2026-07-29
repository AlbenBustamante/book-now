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
import { CreateServiceService } from './create-service.service';

interface State {
  initialLoading: boolean;
  loadingStates: boolean;
  loadingCities: boolean;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];
  coverPhoto: File | undefined;
  serviceInfo: NewServiceModel | undefined;
  isInfoValid: boolean;
  serviceAddress: NewAddressModel | undefined;
  isAddressValid: boolean;
  creating: boolean;
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
  isInfoValid: false,
  serviceAddress: undefined,
  isAddressValid: false,
  creating: false,
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
    canSubmit: computed(() => {
      return (
        store.isInfoValid() &&
        store.isAddressValid() &&
        store.coverPhoto() !== undefined
      );
    }),
  })),
  withMethods(
    (
      store,
      countryService = inject(CountryService),
      createService = inject(CreateServiceService),
    ) => ({
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
      setServiceAddress: (
        serviceAddress: NewAddressModel,
        isAddressValid: boolean,
      ) => {
        patchState(store, { serviceAddress, isAddressValid });
      },
      setServiceInfo: (serviceInfo: NewServiceModel, isInfoValid: boolean) => {
        patchState(store, { serviceInfo, isInfoValid });
      },
      submit: () => {
        if (!store.canSubmit()) {
          return;
        }

        patchState(store, { creating: true });

        createService
          .create(
            store.serviceInfo()!,
            store.serviceAddress()!,
            store.coverPhoto()!,
          )
          .subscribe({
            next: (service) => {
              console.log(service);
              patchState(store, { creating: false });
            },
            error: (err) => {
              console.error(err);
              patchState(store, { creating: false });
            },
          });
      },
    }),
  ),
);
