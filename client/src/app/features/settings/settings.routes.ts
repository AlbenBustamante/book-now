import { Routes } from '@angular/router';
import SettingsComponent from './settings.component';

export default [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component'),
      },
      {
        path: 'security',
        loadComponent: () => import('./security/security.component'),
      },
    ],
  },
] as Routes;
