import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '@core/services/jwt.service';

export const AuthGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);

  if (jwtService.get() === '') {
    return true;
  }

  const router = inject(Router);
  router.navigate(['manager']);

  return false;
};
