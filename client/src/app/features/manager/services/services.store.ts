import { inject } from '@angular/core';
import { ServiceModel } from '@core/models/service.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GetServicesService } from './services/get-services.service';

interface State {
  loading: boolean;
  services: ServiceModel[];
  pageNumber: number;
  pageSize: number;
}

const initialState: State = {
  loading: false,
  services: [],
  pageNumber: 0,
  pageSize: 10,
};

export const ServicesStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(GetServicesService)) => ({
    fetchServices: () => {
      patchState(store, { loading: true });

      service.getServices(store.pageNumber(), store.pageSize()).subscribe({
        next: (page) => {
          patchState(store, { loading: false, services: page.content });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
