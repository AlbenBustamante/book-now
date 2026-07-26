import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./services.component'),
  },
  {
    path: 'new-service',
    loadComponent: () => import('./new-service/new-service.component'),
  },
] as Routes;
