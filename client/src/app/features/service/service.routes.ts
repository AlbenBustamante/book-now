import { Routes } from '@angular/router';
import ServiceComponent from './service.component';

export default [
  {
    path: '',
    component: ServiceComponent,
  },
  {
    path: 'appointment',
    loadComponent: () => import('./appointment/appointment.component'),
  },
] as Routes;
