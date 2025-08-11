import { Role } from '@core/enums/role.enum';
import { Response } from '@core/models/response.model';

export interface User extends Response {
  id: number;
  name: string;
  lastName: string;
  photoUrl: string;
  email: string;
  role: Role;
  accountVerifiedAt: Date;
  enabled: boolean;
}
