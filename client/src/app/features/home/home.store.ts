import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { HomeModel } from './home.model';
import { inject } from '@angular/core';
import { HomeService } from './services/home.service';

interface State {
  loading: boolean;
  home: HomeModel | undefined;
}

const initialState: State = {
  loading: false,
  home: undefined,
};

export const HomeStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(HomeService)) => ({
    fetchHome: () => {
      patchState(store, { loading: true });

      service.getHome().subscribe({
        next: (home) => {
          patchState(store, { home, loading: true });
        },
        error: (err) => {
          console.error(err);
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
