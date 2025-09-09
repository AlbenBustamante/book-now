import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/layout/layout.routes'),
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/auth/auth.routes'),
  },
];
