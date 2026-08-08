import { Role } from '@core/enums/role.enum';
import { ResponseModel } from '@core/models/response.model';

export interface UserModel extends ResponseModel {
  id: string;
  name: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  role: Role;
  accountVerifiedAt: Date;
  enabled: boolean;
}
