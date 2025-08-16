import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LogInService } from './services/log-in.service';
import { LogIn } from './models/log-in.model';
import { Status } from '@core/types/status.type';
import { JwtService } from '@core/services/jwt.service';

type LogInState = {
  status: Status;
  error: string | null;
};

const initialState: LogInState = {
  status: 'pending',
  error: null,
};

export const LogInStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      logInService = inject(LogInService),
      jwtService = inject(JwtService)
    ) => ({
      logIn: (data: LogIn) => {
        patchState(store, { status: 'loading' });

        logInService.logIn(data).subscribe({
          next: (response) => {
            jwtService.save(response.jwt);
            patchState(store, { status: 'success' });
          },
          error: (err) => patchState(store, { status: 'failure', error: err }),
        });
      },
    })
  )
);
