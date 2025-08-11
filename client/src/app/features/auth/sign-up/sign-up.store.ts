import { User } from '@core/models/user.model';
import { Status } from '@core/types/status.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { SignUpService } from './services/sign-up.service';
import { inject } from '@angular/core';
import { SignUp } from './models/sign-up.model';

type SignUpState = {
  user: User | null;
  status: Status;
  error: string | null;
};

const initialState: SignUpState = {
  user: null,
  status: 'pending',
  error: null,
};

export const signUpStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(SignUpService)) => ({
    signUp: (data: SignUp) => {
      patchState(store, { status: 'loading' });

      service.signUp(data).subscribe({
        next: (user) => patchState(store, { user, status: 'success' }),
        error: (error) => patchState(store, { status: 'failure', error }),
      });
    },
  }))
);
