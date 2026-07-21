import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

interface State {
  detailsId: string | null;
  loadingDetails: boolean;
}

const initialState: State = {
  detailsId: null,
  loadingDetails: false,
};

export const CustomersStore = signalStore(
  withState(initialState),
  withComputed(({ detailsId }) => ({
    showDetails: computed(() => detailsId() !== null),
  })),
  withMethods((store) => ({
    fetchDetails: (detailsId: string) => {
      patchState(store, { loadingDetails: true, detailsId });
      patchState(store, { loadingDetails: false });
    },
  })),
);
