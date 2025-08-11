import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LogInService } from './services/log-in.service';
import { LogIn } from './models/log-in.model';
import { Status } from '@core/types/status.type';

type LogInState = {
  jwt: string | null;
  status: Status;
  error: string | null;
};

const initialState: LogInState = {
  jwt: null,
  status: 'pending',
  error: null,
};

export const LogInStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(LogInService)) => ({
    logIn: (data: LogIn) => {
      patchState(store, { status: 'loading' });

      service.logIn(data).subscribe({
        next: (response) =>
          patchState(store, { jwt: response.jwt, status: 'success' }),
        error: (err) => patchState(store, { status: 'failure', error: err }),
      });
    },
  }))
);
