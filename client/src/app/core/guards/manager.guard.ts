import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { JwtService } from '@core/services/jwt.service';

export const ManagerGuard: CanActivateChildFn = () => {
  const jwtService = inject(JwtService);

  if (jwtService.get() !== '') {
    return true;
  }

  const router = inject(Router);
  router.navigate(['auth']);

  return false;
};
