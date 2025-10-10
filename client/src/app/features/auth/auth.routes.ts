import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./log-in/log-in.component'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component'),
  },
  {
    path: 'successful-registration',
    loadComponent: () =>
      import('./successful-registration/successful-registration.component'),
  },
] as Routes;
