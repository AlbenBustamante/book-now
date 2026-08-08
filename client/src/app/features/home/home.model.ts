import { ServiceModel } from '@core/models/service.model';
import { UserModel } from '@core/models/user.model';

export interface HomeModel {
  services: ServiceModel[];
  providers: UserModel[];
}
