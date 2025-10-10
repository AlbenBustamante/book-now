import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AccountGuard } from '@core/guards/account.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@layouts/main-layout/main-layout.routes'),
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('@features/auth/auth.routes'),
  },
  {
    path: 'sign-out',
    canActivate: [AccountGuard],
    loadComponent: () => import('@features/sign-out/sign-out.component'),
  },
];
