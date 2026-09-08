import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { GetDetailsService } from './services/services/get-details.service';
import { ServiceDetailModel } from '@core/models/service.model';

interface State {
  loading: boolean;
  details: ServiceDetailModel | undefined;
}

const initialState: State = {
  loading: false,
  details: undefined,
};

export const ServiceStore = signalStore(
  withState(initialState),
  withComputed(({ details }) => ({
    service: computed(() => details()?.service),
    provider: computed(() => details()?.service.provider),
  })),
  withMethods((store, service = inject(GetDetailsService)) => ({
    fetchDetails: (id: string) => {
      patchState(store, { loading: true });

      service.getDetailsById(id).subscribe({
        next: (details) => {
          patchState(store, { details, loading: false });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
