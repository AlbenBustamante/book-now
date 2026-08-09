import { AddressModel } from './address.model';
import { ResponseModel } from './response.model';
import { UserModel } from './user.model';

export interface ServiceModel extends ResponseModel {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  durationInMinutes: number;
  price: number;
  address: AddressModel;
  provider: UserModel;
}
