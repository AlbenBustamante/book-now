import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LogInService } from './services/log-in.service';
import { LogIn } from './models/log-in.model';

type LogInState = {
  jwt: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: LogInState = {
  jwt: null,
  loading: false,
  error: null,
};

export const LogInStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(LogInService)) => ({
    logIn: (data: LogIn) => {
      patchState(store, { loading: true });

      service.logIn(data).subscribe({
        next: (response) =>
          patchState(store, { jwt: response.jwt, loading: false }),
        error: (err) => patchState(store, { loading: false, error: err }),
      });
    },
  }))
);
