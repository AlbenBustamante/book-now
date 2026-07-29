import { ResponseModel } from './response.model';

export interface AddressModel extends ResponseModel {
  id: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}
