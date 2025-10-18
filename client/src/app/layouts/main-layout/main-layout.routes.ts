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
        path: 'search',
        loadComponent: () => import('@features/search/search.component'),
      },
      {
        path: 'service/:id',
        loadComponent: () => import('@features/service/service.component'),
      },
      {
        path: 'manager',
        // canActivate: [AccountGuard],
        loadChildren: () => import('@features/manager/manager.routes'),
      },
      {
        path: 'settings',
        // canActivate: [AccountGuard],
        loadChildren: () => import('@features/settings/settings.routes'),
      },
    ],
  },
] as Routes;
