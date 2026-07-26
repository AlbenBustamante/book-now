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
        loadChildren: () => import('./services/services.routes'),
      },
      {
        path: 'customers',
        loadComponent: () => import('./customers/customers.component'),
      },
    ],
  },
] as Routes;
