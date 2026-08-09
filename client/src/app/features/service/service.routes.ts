import { Routes } from '@angular/router';
import ServiceComponent from './service.component';

export default [
  {
    path: '',
    loadComponent: () => import('./service.component'),
  },
  {
    path: 'appointment',
    loadComponent: () => import('./appointment/appointment.component'),
  },
] as Routes;
