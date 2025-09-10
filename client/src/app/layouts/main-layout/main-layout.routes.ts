import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AccountGuard } from '@core/guards/account.guard';

export default [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/home/home.routes'),
      },
      {
        path: 'account',
        canActivate: [AccountGuard],
        loadChildren: () =>
          import('@layouts/account-layout/account-layout.routes'),
      },
    ],
  },
] as Routes;
