import { Routes } from '@angular/router';
import AppointmentComponent from './appointments.component';

export default [
  {
    path: '',
    component: AppointmentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component'),
      },
      {
        path: 'details',
        loadComponent: () => import('./details/details.component'),
      },
    ],
  },
] as Routes;
