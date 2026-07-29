import { HttpContext, HttpContextToken } from '@angular/common/http';

export const JWT_CONTEXT = new HttpContextToken<boolean>(() => false);

export const skipJwtFn = () => new HttpContext().set(JWT_CONTEXT, true);
