import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@layouts/main-layout/main-layout.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.routes'),
  },
  {
    path: 'manager',
    // canActivate: [AccountGuard],
    loadChildren: () => import('@features/manager/manager.routes'),
  },
  {
    path: 'sign-out',
    loadComponent: () => import('@features/sign-out/sign-out.component'),
  },
];
