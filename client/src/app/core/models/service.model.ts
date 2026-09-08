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

export interface ReviewModel {
  userName: string;
  rate: number;
  comment: string;
  createdAt: Date;
}

export interface ServiceDetailModel {
  service: ServiceModel;
  avgRate: number;
  reviews: ReviewModel[];
}
