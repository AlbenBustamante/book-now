import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./manager.component') },
] as Routes;
