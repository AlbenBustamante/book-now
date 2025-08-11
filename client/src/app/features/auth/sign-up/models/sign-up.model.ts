import { Role } from '@core/enums/role.enum';

export interface SignUp {
  name: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  role?: Role;
}
