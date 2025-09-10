import { Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout.component';

export default [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: 'manager',
        loadChildren: () => import('@features/manager/manager.routes'),
      },
      {
        path: 'settings',
        loadChildren: () => import('@features/settings/settings.routes'),
      },
    ],
  },
] as Routes;
