import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ManagerGuard } from '@core/guards/manager.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'manager',
    canActivate: [ManagerGuard],
    loadChildren: () => import('./features/manager/manager.routes'),
  },
];
