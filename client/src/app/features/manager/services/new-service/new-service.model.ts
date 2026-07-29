export interface NewServiceModel {
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

export interface NewAddressModel {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}
