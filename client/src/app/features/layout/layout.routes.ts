import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ManagerGuard } from '@core/guards/manager.guard';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.routes'),
      },
      {
        path: 'manager',
        canActivate: [ManagerGuard],
        loadChildren: () => import('../manager/manager.routes'),
      },
    ],
  },
] as Routes;
