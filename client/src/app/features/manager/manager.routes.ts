import { Routes } from '@angular/router';
import ManagerComponent from './manager.component';

export default [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
      },
      {
        path: 'services',
        loadComponent: () => import('./services/services.component'),
      },
      {
        path: 'customers',
        loadComponent: () => import('./customers/customers.component'),
      },
    ],
  },
] as Routes;
