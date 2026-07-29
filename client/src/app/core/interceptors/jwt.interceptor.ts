import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JWT_CONTEXT } from '@core/contexts/jwt.context';
import { AuthService } from '@core/services/auth.service';
import { JwtService } from '@core/services/jwt.service';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const skipJwt = req.context.get(JWT_CONTEXT);
  const authService = inject(AuthService);

  if (!authService.isLogged() || skipJwt) {
    return next(req);
  }

  const jwtService = inject(JwtService);
  const token = jwtService.get();

  const reqHeader = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(reqHeader).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logOut();
      }

      return throwError(() => error);
    }),
  );
};
