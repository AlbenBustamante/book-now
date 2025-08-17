import { Role } from '@core/enums/role.enum';

export interface Jwt {
  id: number;
  role: Role;
  sub: string;
  iat: Date;
  exp: number;
}
